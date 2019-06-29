export const Ruler = {
    v1: function(rules){
        return function(rule){

            if(!rule)
                return {};

            if(rule.indexOf('-') === -1)
                throw new Error(`Código '${rule}' inválido`);

            let objetoRule = {
                permissao: [],
                route: [],
                passroute: {}
            };

            let ruleArray = rule.split('-');
            let permissoes = ruleArray[0].split('');
            let route = ruleArray[1].split('/');

            route = route.map(item=>{
                if(item){
                    return item.split('.').map(item => item.split(''));
                }
            }).filter(item=>{
                if(item) return item;
            });


            permissoes.forEach(element => {
                objetoRule.permissao.push(rules.permissao[element]);
            });

            route.forEach(element => {

                objetoRule.route.push(rules.route[element[0]]);

                if(element[1]){
                    objetoRule.passroute[rules.route[element[0][0]]] = element[1].map(element2 => {
                        return rules.permissao[element2];
                    });

                    if(!objetoRule.passroute[rules.route[element[0][0]]].length)
                        delete objetoRule.passroute[rules.route[element[0][0]]];
                }

            });

            if(!objetoRule.permissao.length)
                delete objetoRule.permissao;

            if(!objetoRule.route.length)
                delete objetoRule.route;

            if(!Object.keys(objetoRule.passroute).length)
                delete objetoRule.passroute;


            return objetoRule;

        };
    }
};

export default {
    Ruler
};
