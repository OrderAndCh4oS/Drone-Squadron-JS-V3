import {
    canvasHeight,
    canvasWidth,
    context,
    debug,
    dm,
    grid,
    pm,
} from './constants';
import { deltaTime } from './service/delta-time';
import Drone from './drone';
import { gimbals, scanners, steering, thrusters } from './constants/utilities';
import { weapons } from './constants/weapons';

debug.initialiseListeners();

let fpsInterval, startTime, now, then, elapsed;

function makeDrone(d, s) {
    return new Drone(
        d.id,
        s.id,
        d.name,
        s.colour,
        Math.random() * canvasWidth,
        Math.random() * canvasHeight,
        0,
        Math.random() * Math.PI * 2,
        weapons[d.weapon],
        gimbals[d.gimbal],
        scanners[d.scanner],
        thrusters[d.thruster],
        steering[d.steering],
    );
}

function setupDrones(data) {
    const s1 = data.squadrons[0];
    const s2 = data.squadrons[1];
    for(let i = 0; i < s1.drones.length; i++) {
        dm.addDrone(makeDrone(s1.drones[i], s1));
        dm.addDrone(makeDrone(s2.drones[i], s2));
    }
}

const moon = new Image();
const star = new Image();
const stars = [];
for(let i = 0; i < 40; i++) {
    stars.push({
        image: star,
        x: Math.floor(Math.random() * (canvasWidth - 50) + 25),
        y: Math.floor(Math.random() * (canvasHeight - 50) + 25),
    });
}

moon.src = 'data:image/gif;base64,R0lGODdhbQJuAncAACH5BAkKAAAALAAAAABtAm4CwQAAACEhISkpKS0tLQL/hI+py+0Po5y02ouz3jL4D4biSIbciabqyrbuC8fyTNdcief6zvf+D8TZhsSi8YhMKpeIoPMJjUqn1CDzis1qt1xW9QsOi8dkcfeMTqvXirL7DY/L5z62/Y7PJ+j8vv8PCKg3SFi4ERgmoLjI2Oj4CBkpOUmpiHiJCWa4ydl1WQkaKjpKWmp66pipKtjZ6npDhio7S1tre4v7uLpb9erbKpUrPExcbHxcyqus89uc1TMQgDxNXW19jc24vB3g7N2SIzkwHjlunl1prr7O3t6ODh8vL8md+X3/ICLqTg7JP++Pn8CBBAUCPIgwVz1W+IBJA1XQYMCIBedRvIgRY8KN/6YyenS3cE5DNpM+UixpMqXKdxNXunwJM6bMmTQvhnwzckm6mixp8fzZDx3QoUSLGh2o7aaZnDBCHVWHDSqjpx7hUb2KNWvEVEp7MdXQ8SrHllp7Wi2LNq1YS12jfH0wS+vYW1g5qr2LV+aitk/e4io7Vx7NwHkLG0baiO8Pb8QOswss1CVkR44rp4WkmMemaZZPTr5W9fOozqRj0suc407jR6WzioaY8TXs1nLJSo6EusSZY0FZ074re5HJ4OV+u3YKE3duEzo5m0Vp/B9xYSqnU46+dudMzMs/FAGNmO5x69Vekr+OnWip7cqXz4js+bx85+znp/9JCmh71C7imf/eqN98xfEkoHD3JZcfgadllgJACiJTGnFGFTjVgR+h8uCCfIEFoIX3jXUUhb55uFVc/1GimAWfkcjiAPA9JeJsLA4znCgbRlDhicW0yKNGJk4YY4LYndfWA0NF1WOSFTVWX5A/GkaeUg1k51+G1lmWjXlO2nJZcDcpAGVCF22ZI14WIUgmhlR+FtIBSrqYpph5dbhSnH/pJdtCBryZ5IqFgYinnWrWmCc3APCJaJ3GVDaXooJSV+Jr3CRK6WB3RvhoprU8F9gylX7apHiMakpqqWztAmqqoW56mKmnEOrqNcqoSmugkAIXK3qr5noMLwDoWmuwse2IlqZShRUar8j/rHKAOMI+6yOx4yk7aHjUKmQPAjJCy61Ei057bbWchmtKtgmM1m26495aG7mvDuvufgwtgKy69oIHY7xP/kkcIjgKaW/Ax37brr77kmiMvxOgK3DD64rKo8ECeIitHxgg53DG0kEMqsTpnfIHB9ppTPKS73IrsXz8WKyCsyW/PKZP3aZsXR9NbQtzziZL+ynNCfFhg7g6z1wqaT5TIxISlw59IH3VHQ21MHJk0SjT+LG7zoDwRs21LHGkEaPV57CabNdmwwOHHnE6zKWjZ7+NtButkFqr0GjCjTcxZdyTS3zW9LyPknlLTMZbzTIZKdZ8Bo6obAQNjspShsPF884H//eJ8eJF302hTV9MLnLlsI4cceaJkhuggzEL4BXo/SGu44gzmq4utVfL4jbrVLh+RN+32/abzGLDmWnwp/bFexfC10Q6bVWfDnnFViRfyOVPAwyt9U1HP8v01PPNuKWKr/n86txHudj36v/avJaERQvZ6Od3qtn69i8M3a72QT8/NszcD0AWtG9UogtY/0ChmwAqMAm0a9Xyhkc8s4lggRRUW73UcjIIdulnFezgV8rDufBpsCjZ8KAJT2gAp7nPbiO0XC1QCMMYNohj+ntgyUQhwxzqEGwNDBHcdgjEICowg/J7jRCPiMQkOqA7YVCiE58IOiZKcXdQrKIVUTDFLP+m6Ipc7KAWvwhGKHRxjIYIoxnPGAgyqpEGaGyjG6W0xjguYBsHPN4bbyTHHc6hjpC5oyry+D0w8FFffpwaIF3xhEEqkiuF1MQhz8CDRkTwShtbZIEa6ZZHDoEE7dPaJBFCFUv2EZM90OQJQIC9SkrSb3IioCinQcrUmJIBOLsesGoIIQgCqjO6i6V35DhAW9XSeUhqYYsS48tuOFGEqePNJyfmmBcZMzp29KMMU0nCM8mOX1WaptGq2cYhsvBIYQOM6rwZTXCG0XVtK5ipsnlOdOJqL+EE39LM6bMQ2kWe+UqKGV9BMGLGKyXl5CdBufNFQlDjXk6CX+dyts3bIHT/imtYVERfRp6y7Y9kPbyQvNxDNWcOzJNso6RGTYrRYBZRnVvs3ULdcUEsGUyiKtNYTA86Uf4EDV+P810zo4ZLxzUMmytEZm5icBaPisZ8riJnTdO1nt8ZlUEtEwzzeIrP86hHRM8iojAZ2dIMgNKgqtylU4OkKhviFEVhpcD7yMpKaW5VUI0jmy0n0VbKrXKtPoVr7O4JT7ohLKDWCkWRICBVkfp1rtr7alMFOh04MqCff1vsWWn0V32ZKbJfAlNWk3rXgs4JqzR112fZpCcEbO+Ve8XgQTJr2p+i1lB7qtQiuTlWfca2qJPRk2VPm0vc5ra0NNuapCb12zARVrjx/zRu3sraW08lF7Lt5CVrFynd6RpnfJu9riJnpd0hwa67AyUudnfBPkWEV7yY3aBge+MypYqSWekt03pbo8JQnu2k/aNvfYF333QqlnzPfRjk/qitjgbYgQXUL+RcKEFM0JKoC57nS+vCPfkSTmENuGmFGZzfwJ5PcNXgsF4V/GFXjne7RzvmMNJYAWammL2AJbFmVwuykIlVpTP+mFpTBVTrQjNrumBZ6OLbY81RuKvedY6Rq4rkJPOvvWltsi2AJgOGSRlzoLWtldlqyCHYdcvF+rKZIxdmBvaVzLylYZvPTK6vcSE4v+Wuge1bWDiHK20k2RLMfuxQPc8PJ9Wja//2GqthQR94b78wFpC1bKVb8lXRQSocU+wM0+BOmRKU8hOlPzoF9TUYuoB28TBLJ9RAD9qRFNQ0f3lsIRn3KFywncyYWJ3D5U4awLFGMZd3K9sV95SlQOAipvU5u6i2kEwU86cYTenmWquXxmvO2Ken6r1ZOqDUuctfsrNkY0E/W9sn8LB5fe3a+L062nm+brbJXQNZn/tMK6UTU68Ny1LCezfeDuo+iXzRO7P73vj22g727QpO45e0dSu4LBE+uVMzd8wcHSQJIH5NiVtY2Wwm+EZ+ifE4hnjeCu94u0sY8pSf2NWhRfd6j6HymMd71N3mODpnIfOcFxp3lAV3XRv/ofOgo1DSwLWT0I+OdLeuuxhJb7rTi5DQp0t96sm09NSvrsSqtwnrXHed1q3Z9bDj4etk/5/Yz16Dsqv9c2hvOwXWDvcnu/3qca/7NuYec7vrXad4l+Pe/w7GvjsR8IQvpOBPSEpZFV6Lhw8kXwy2eP82/hu7gHPk5Tz5Mvah4Aa/PBUzn4Y4cB4dnncC6K8whtH3q/RmP/0MqKD6R7F+BK5fARRiD/nZ1/4CQMA93kq/+wb0QL0bHZvvARL52u+gHJ5869KPrzfACx4HJX/mtI1v70hD/xZ7P/sIeth8W2N4+7Swu9RDAOmHJa6VoyU/AuEedFSm31tEfz7LBexd/56oPeQP6Xe9/X1/C9c1eUF22lZ9jnV9icVwJocwX5dH/geABoJjrcWAyVZ1YwSBVzVOmLKAFbgrvgRFGoeAfVN/ZVZMHpghsXRELidtq0GBIHaCKEhTmJRrLDiCzhFwJthlMjhpjWRCNgck6qZcO8iDhGJ4AbSBCvga7UdvRZgsYPc9iKZ9D+VgzeWEfvNGvMNtwWYnPWdVVxgzWfhBFFeFtjOFRAiGj0FPZ9QQxxaEN6Zb7AeGRfZPzUBl7pUyJJd9PJhTjJdwwoZ/wOZcElKBfUhRhhCAHIg6iSYgUgZqUjQIIwc4aTKITzVjGnKIdkAjOYgyVBhXxVdxnLh0Uf+HBhZVggKjVYyYUTd0gDVHbFS1Bd/Ca6yYaqqGUjYlgh7XS5AYUrKYgSU1Hfa3VH9mg8MGVt3BBCP3i7Vzi7pIZ8QIa6+Wid9xYQDXitS1iC1HiLg4f7v2ipK1U9WohlJYhnDojcFobUCojd+4dTMHQvQ3cOIDNS1YiwbUjeeGjO8Rg8Z4h3o4U/K4ivYob2+Wjy8gVxDmfiR1g8PIjPeoWyAlQGjojFaoiszGhdt4aA5JchCJAl9Ij7omYqCogY3IZOr4Zs52WOXmkQvZj0W3hJdFkg1nkie5hnjEIStJVs8YkiLpZV7lj+yoDBsgh9NVPhfpiZtmbpVoiKl1AUX/+XKv9YZrg5QzKYxAKXn443wfJpFGKVqoRoa2uJS0hZWnCI81lmSSCJNd+G1meXKYyJQQ8IL1toUd54YAuTnU5iVd8S8JSJPxKINz+ZGGxmKc1VlTooQgWYRsGYexooh5WZgLEJVoyYeAKJdmOHGi8ZgJ4IXv2JicCYM0p5TZ6E7H9ZZuAi4HuY7o+JniWJnKgofRVZqH4pJb2ZYxyYT7WJHXMpqjVA+aiY1Wdpk+95OMuZP005umOVisdZsUWZWueYYcwZRT2T9D2ISLaZnW+XHHSSt8RJ3MmZuC2JwH0Ztz6JTpNlx9SWvhKZ7IlYZgWZcEdp7qeZ0IyZvg1Z7n/+iXpwmV3xlkpGacvHCfEaiRG5eQ3FUo9hmgLLlkwVmgvJJdCSqgxaifDUotCAqhgbmgr0mhFQqgFzqS+Tmh+fSJ39WhHvqhIFqO4Cmfg1OiJmqXKOpDoomd58MLEuiiCpqEm0mcL8pHvhKXN+qKX5milDhS0Zhpr0RfZAmkoQmjPFpc/MmiCPZfP7qkK5qhack163dAUjqlSlql9Fld41dgZUmj5tKlovilEwmYJzqm47hqEpZg15imrUmOh7lftck1Zno4RjqneLqmdjqAapp7JhanA9mnZEqZxXmn7hkvcEovVHmoiJqoXGk2QZorl7ByEhqp8JWIWIo3s5YNhP/6qFe6qZJabTE6P2+yLKI6qoZaqmCqmIr6YKb2YjC2l5r6qkc6qQLoMWtZC7YqAQOaq4zKc+FmjoNZfvPiVrk4rMSalMaqmxM4Cjp2MczarFBqrb/2jz4GZli2Y3J6rRGKpj25oXhmfNQqlMsYrhg6ro9WrhQod0c2i+v6nO0qk++KkpgHZQpJr56ao6qKrzZjkODar/X6p6AKfd56M9lasKkJml7JeQqbZcLasLAan9D6ZXRAjT5ZsdaIr3WUNEbQpF86YIL6sYRJaErQki5aspZ6sigrN1iAmGk4sy77sgeasr1YnkR5bOoqcDc7WzHLbzxpNe+JfQRbpEDrmIz/VlFdCVFCyo9Ke6lCqxoWCYx16qdSayc5a0FS2YkHm7VaSyZUi4iPUpIc67BiuyVkOzdmu52QarNqGyNWxxiORq4M+53sKrdSMwaXZrTWt7La6rO9tre9Ijl+8beAG6ZKxqcfIoSKq2eHy0676rGxmpyNy60vabFlimuiVrOVi7WOi7fUJJjoqSlNVEGfC7rPerlI27p3abqPWxCd60GqG7WYazyjS7rRKq64KR1st0MPa7JDhrC4S7jzSamJ2w+tg0S2q6XzurvG66vp6aTFqmGfV0WBq1u06ro6Y7Wvi71kpLxg2Wxo671um7u7aHrQZrmpKbqLS4sOl0n7Br/0/4iX1dlp8os8MQe2Jvu+Qwmxkbu/SBe6w2uub9u/QibAxcZ11qu3NiosUBu9GftuZ0eq2Aq9GvpvBqy2DAx6FGulwvu8GzyihWuVHhB85+KqISyZ/gnAI9zB+pbCmZrBLNypP4u/zhqwBzfD1dq9NpxU/Hq8J8vDPTxDUTaj9Xi3uNd6RoxUSKzAItwxipZATqxmUByI7fu1lnRxVjy0NUxeBSyQUQoCXhyJugufuKpdTsIcZvyHK6yDcOyBcwFybjwSLYujYGxyCWHH98OaafvDZxkPfRxDlZXEXlph1kDIIfjHgGyvdTYMi6xJzlvCF7xstCDJQTe+HCzERVsKmf/cdiOLny0cwI4AylZsvrLaTZhyyq1Mw3pcvdTiyrP8xMSbtGh8y/NBy7t8xtIbGLwMzOuTmcFMzIZDSsWMzHqQfMnMzJs0e3XQzNHMe89Mu9KMzNQMrNYsydh8d9psxNwMi96Md+Bch+JMdeR8hOacc+hcgOoMb+zcfe4cR/AMfPIMRfQMzvYMRPjMzyisz17UzwHdxv+sPgJt0F1M0MZ80AtdxAntDQwN0dDs0A4R0RXtwROdBxat0eOG0Wiw0R8dvh29BCBN0sAr0lB3Rjhb0qh70q+HGrGy0gPc0ioQEnkT0w830xmgDO5203Wc0x2ACfgW0z+dD39Qrh9N1E3/QAcxDNE/LQcmHJb0LNJuANXl0s8JHQtVzX347M5ioNX5xs7aXAVfLQ/ozMywR9bZyc3BHAxpHbS6N8uJ5NZEAteZHARzXWn1bMd3jddxotffDA320dekcHk9PHzEZ4m5PNjYFs+uF0mSFH5mVcluXXigFw4TEdkkHLd7K33TVwIll9kvfMha+3duR31IHNoXa7BMXXdix0mdRBY7y1hVbX5Y932nRlLit5ti29pOpw+G2smQm8Mh+rG9LXTot8LBrdg4SaA7vH86J39yrNww7JndCZwzUXZ55wG4PN2T3cirmWFU0c4Q139YTL55TLnW3Z9q4YD7Vt7dDcO9q728//qkwDHekyy9kpq8Uny1w+1A7X1IgRyas92BHYsgWgdIgzvKEDzBiGzgHnWBaiTgdEqlnUnKpZqvPmhs5i3fB/ybeIzhjK3hjMzh6A3f4E3Jc5rhUJhEuMykcixThhyuKy6GK+jiOrzJqszfQCriNQ5EaozBMuPgQ3rhVVqTLJ5xN/7ikDLkaVzkHtrjaJTk+e3ImPXIOvrdRh7lbHhCIGziVt7kqIqaS0rj5Zy6Xv7ABT6bWU7mJ8xEZ27Jaa7ma37Dba6+9QRAqbzaok3nKX6hRy7l9uPAkYmRfV7ddo7kk/uvsRyQTj7nEFrmfqiFg07oXCWm/v3nkT6NhiPGcv+eijr+6AEK6IHH6Qkcu9/rrzLO427Od3cswQS+o2xKm/ep6W/u6vVb6byy56E+maMu6d9wqmJeXqMtnO15jKRet1qc6rru6ap+hXSI7L4w31iuokDM5gwI7dHeCekt7MdK4fuZmMf+65vB7XFMvd++h3SZ7eOuUDtu7udu7aq9YI9o6ztX7suJvN7djIkc1UfV7n6u3rGO45rbY/TOkVUL4sgK79S97/Pe763eZ3UunZau7zpZ8AYP8Tz05Etsmwzf8EN15fSp7V/8FyHvrkQbtgQfimFem6RI8iXP8sHy6QOv2ysPyyKfRaW4IyafkYVe8QzJjQoOw+x+Bb5Y4fH/C/Q/7yc2L/S3y+rHqbNgzvNbnPQ0L9tjXOJgSfRXzCRNTzQ+7/FV399eb6qbrrLOROUIDPabu/RIn/WVbPYupWsTLvMf7/RrD/Jpvy5xTwTKqPcMarfxztx5T/cIyffuiMdAbp4Lv+Q1n45K7qZbrpci28isi++8u+BtP/aQz6m+bpPh2KmWv/gyGuRZiYpwq/UFCfqh/+rUjvnoLrtYr/iRL/nDXMvXHuygnu+lb/oMBePUXe8T6+y0j+sdnitfLtm+P/v+qfoDy+vCbeou3KvNLu89z/nE7/ng+DrPD/0bKusW35DLL6kHH5G+m/IJud+9f7bXT2rkf8Tmz/bg/37+fgaoYh/BqH+O7q+SxS747o79BCAfU5fbH6IxabUX57h55xkMxZEsTc0TznVygheO5Zmu7RuXgZ3v/R/ISw0drAsRmTKCkk0ncWl6Tp1R6xWL8mRDj9wXHBYHgmXzjorkttLVtagdV7+1cnuDntdjoHvIGDBw7IzQ5+4j7zBir0TRMYGx4nFSJdKSa87PRZCzc6YQlLJIU7TysrE07jRV8dR1KVPvz5O2E/SMdYFR9DUqt8n1966XeCQ2cbZWefA2SFiiOFpa8lnptVp1WjuJ1Gv5+6sZCNtA23ybfDQ4nepcGpiOA3z+Rtww3T0/ml3hmj9Nnz9uazrQM6jDnv8QdgEZrvtn6tJDgA0jucni4WDGhGgeUvTYDZ9AiU8+yoJHMEJGjfZGQiz5EsvCXi3bwIxJEtMGlQdZtrT58+KzfTTbAWUx8UrBnfPEEXVpFOqJX++cTomKCikspUu/NVO34tBVsb4coauKc6yFYUZScO0aql/StWnpHp1L7GxWuq2kYnS7DC4kuXbqFtaaDW/eonUnkRjyV1khwTnDGrbcV+8qxTXHbk4AuRYhaG8aXzaNeaBIz1bFrhYAmpboXZRO13bM2ZJr3EBdw7Z1pmIp28O7LA6uO/NH3b4FAT8unHh0aoRNIkesfDXzQGYc8pL+nY2ceNbvMuytnRmQxND/wRMvO5789YDZ0YsJsj5V++jvKcevfO68+sJRD7/8fhKqJO/6808+qhQTEAwCiwkJGesSzGVBBlkzZzMIB+zBrGpQ0rCchqbKkMSTpnnQQxx+AJAfK1I8wCNhRpxRxQlZbLEGH8zrSAocn3KHHNKE7GOos3ishwfeTsRKSIpEhO/IIXRUckkaQOysypF+LPLGLq2JaMcsYdgyLTEl+hIbI9VEsjoszTyzSdPebFOfNYO600qQiJqTTgD245MVKWXak9AtqHQKUDq/S5S9+f5xE1IIFv2zUTIE1W+ASvnLE0hEPX0ARZoy3YHTNImqMdRSR53sMDnnRDVVxnwycdIK/1/VRcYOAd201vYKZTVXV3eFFUpZzQw21WFxLfamYy1FLa9GmWWWNmJbjVXaaZNlFNBrxS1N20O57XaD25RdUtx2H7kQWrvQ7bOOqsJtF9/wdsNu3lGZWLfFfAXW17iX+vX0X0yXHXjgfWE62N/pFGaXYYHFOxDijB+as+KGHeZX45Cx4bhjixs0VOSUn1m4ZHypg1flmFNhuWV3T2ZT5pwfobnmcS8uN2Z1dSaC556x/RnlkMkauq0sjTb5ZhgzjpZpv3h8Ot/yJO1X1Kp1ohhrn1/GeVddvU4m4LBd1lrqsuM82xseaVT72v/ykXY2uNH2cDS6a7W77TspSLdXvf/jbhEAZP3Wj20HxVRLUbYM37s+jvpeXFjAHe8S8g4Gm3wBHi2fG3NO3+XwcYLhBAv0zxBPXPHSpSN385TPBV102OOSPXO+Qgya2tZz151X3mc/fcWqv5389dEZMP5R32vXWWjcPezBW+iHQz55uBMW/nqFSNX+eM1nmvx7w5t3Hg/yBzVfNeXhUB/CHwh3f3vur/R6fr3Dx/5++LPNp6Y3NGN47X8AXIQAByi97vGvejKr3zg8x0A7EbCA1FteyCZov8hZsDDZ+h3TJCeyDnrwgyDkkgiTdLalQUxAZlidCq9ioBa68HPSimEZjkHD1iioQDgEmr0qJ0N6+XCFLIz/n/dARkTtiOaISEyi/s6HvtOwoohGHJMU96LEKlrxgpTIohYryEVbUTGIhquNI8ZIRkSYMYS0yyAEL6OINrpxgXCMIwahIrI62gE9XkmhHrsIv6hMzTJ3CKQg30hIw/DxjMcKIxWe2JQyOnKPjYskujbphEVaMoCYzGTUEnmwQjahkj0JpShHWbD3dauTVoPNRog3Plb+8WPl4+QPieYbWtbyK7ecZI4YB7FYMoA5vwTm84TZQIsES2UHOsImQKPMZRavmfmb4dGMabDLSew1vrRmHrPpzB7+rXV4yoA4x5m9cq4xNVlLJ4IqkExrsm9379TmFuU5TxtRgJ33vCbp//T5ylV6zJ+/mKVAxcfMgupym9xM6MyqydCGOvSh7skleCZaioVa9KL5zKhGkdasjh6ioiANKTZHuk9SRu+klEypSvHJ0pYOU5MQjSkSxjCA2ND0HuS8qTkN6dKdypIrQKXgQYeqKgwV86hbSapSUXjJpjqJJgaNagMgQ9WlRvGqZKsSxraqgK569atgDesDy9rWpk0VrVWN6FrT6Fa7UhOucQ0qMen6nJcW564wdIteeZicvhprQ/IK7Lz+Qlg8PvOwJSwq6xbL2Lw6Nq2ujGz/cnq7yo5qsJjFRWcjC8mufRa0SxGtZLbVzMa1T7KoTe1OVhsYPbEyp7YMnmwTdf/Z2hY2q6LcaOcwGiTeesq3vwXuWZD4V3DCNoLHvZNqlctI5GjPucR1Z/qkO12VVFeV8ZGdZjfYXQl+F7zhZZDaDFte86aMtulVr4aeltgXvjdn8ZUvKGdUM/JSFr/nXcl+E3Ikhv03tgE24YAJvJHUiS2eiFUwutDb4F9yzmZ8zeGEM8ZgC9PyTRJV62k5bFmDfFigIUbniCVc4tnSA8UMVbHpWNxiF0PKwzFu54M5Osi3iXTDNzbViXWs0uFO04Y63W4rhbwxGBfZyNkdHBC1GkyiNpkcPIEyTUt6QDRe2crwxHI6iLxloI4tulI+ZnHBnKv3ltnMSiXtc4+MS6H/tplCqvvsk+OM1jnTGcF2XvIV8+Llo/K5z37+85S7LOY7O7oqAJ4nohMdVwca2r54timkcXSpSjGl0qK9NGfRQtJHE5rHNvaMCUAdalGPGrCQ1TSQOa2mH6/6BOBwtXIna9xGGjXMqEZYmAq9grfsmtew9rVVhT1onFaKUsxl9bGRXV1lL5upj/y1qSPm6RhJgdrVBu+1Ja3bZ0MXpq/yKz1REW5xp5fcu2WztrMN7GFrxoucBcy7PxxvedN6zZvuMSxzs2gkG2Df/EZxrxMcu1M6G8KJKnipExwZhRfZ4A1vtrl511+iWvziUG602UpE71OPt9MmR/hPQx7nkUeb/6BOrTHdovRwlre8zy83VsDrHbYZYzWcv8F5qNXc8JgfMtD+Ne/Nh+7qOgf56EZheD+P64mm87u9iJ0imKDKW6tfXeGZ9rbDH+aldO9Z6GC/uKzH/k2km4vbi0272lvOdpjPm6zx2vhdOUF3utudxHjnub95Kfft+B3xgC8cs6Ep9sHHtDmIl3xNtx14jot4rlsv6+En3/mBQhzqJ3/WrRSr81hvHhCeV/1KQR/61t/NKUYfcxJSv3rbf17wqhb41oJb7tnTPj23v72Pdc/PG5rd979/a4SE33wF9nzxXHc93N2rfMq5yPnZf/7li0/l0iP/39Y/XA60X365Bnv66v8MP/WxLX6uMt/88d8++tM/pfa3dv3uDzr55d//vaL77nrv4BSH3TzL/eDP/xLw/3Iv+opNz0pO0MTvQxSQAs9v9+pPTwCw1m6M/yrQAzOL7CxvNc6OA7HvA0/QGTSQ2HSj8QLMBFEQBlOQ/sTKtFYM7XokBnNwtGZw9KaOxuyKSXRQCKGIB2kw6dZmp3BwCJeQtV4P9kzvwCZKCZmQCpuwCHmP4miOfhCiCrvQugDOm7IQc6rmE7zQDAtM9LAw8/wmv2LgDN/wwqDvCdewnBjEDeEQD5WJ8YxQDq9qyDQlDwNxx2Zujq6wqSTiBQRREUGK8KiG+PrqHxZREs/sy7rwDwIPix8mUROpKt8wkAFbihw2URQtrQYbsPJuShhGURUdy/tM8RQfihVWURZXqxM9MQRdaxJmURfHrRa/7xGF6w52URgJrBcNcA+5yA6GURkXrhR9kQ4FKA2WURq3rBnv6xk7zgmmURsrLeOcsQ8XJwm2URzFLetW0PhQjgPGUR3rzvHMsR07JgLWUR7V7h1JzlmUzADmUR89T/HsEfzyTgD2USCz7xzrKmYGEiET8Be7A2IS0iFz0BCX6E0ekiLPMOpARUgqUiM1kQ+ukdSQYyNDchuP8f4eQiRP8iRV8CN/ASVb0iWtibum4CUpsAAAADs=';
star.src = 'data:image/gif;base64,R0lGODdhBwAHAHcAACH5BAkKAAAALAAAAAAHAAcAwgAAAJaWlnl5eb29vdvb2wAAAAAAAAAAAAMRCBraMqKBFyWT4OYwyAialgAAOw==';

const background = {
    moon: {
        image: moon,
        x: Math.floor(Math.random() * (canvasWidth - 500) + 250),
        y: Math.floor(Math.random() * (canvasHeight - 500) + 250),
    },
    stars: stars,
};

fetch('./data/squads.json')
    .then(resp => resp.json())
    .then((data) => {
        setupDrones(data.data);
        startAnimating(30);
    });

function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function drawBackground() {
    for(let i = 0; i < background.stars.length; i++) {
        context.drawImage(
            background.stars[i].image,
            background.stars[i].x,
            background.stars[i].y,
        );
    }
    context.drawImage(
        background.moon.image,
        background.moon.x,
        background.moon.y,
    );
}

function animate() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.fillStyle = '#242526';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    drawBackground();
    deltaTime.update();
    dm.update();
    pm.update();
    grid.draw();
    grid.log();
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
    }
}
