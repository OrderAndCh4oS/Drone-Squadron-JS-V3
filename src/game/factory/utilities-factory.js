export default class UtilitiesFactory {
    static make(utilityFactory, parameters) {
        const utilities = {};
        for(let params of parameters) {
            utilities[params.name] = new utilityFactory(params);
        }
        return utilities;
    }
}
