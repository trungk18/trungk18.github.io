define(['app/portfolio'], function (app) {
    function PortfolioController() {
        var vm = this;

        vm.menuList = ['profile', 'portfolio', 'skill', 'community'];

        this.$inject;
    }

    app.controller('PortfolioController', PortfolioController);
});