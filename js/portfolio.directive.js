define(['app/portfolio', 'fullpage'], function (app, fullpage) {
    function fullPageScroll() {
        return {
            link : function (scope, element, attrs) {
                element.fullpage({
                    anchors: ['profile', 'portfolio', 'skill', 'community'],
                    navigation: true,
                    navigationPosition: 'right',
                    navigationTooltips: ['Profile', 'Portfolio', 'Skill', 'Community']
                })
            }
        };
    };

    app.directive('fullPageScroll', fullPageScroll);
});