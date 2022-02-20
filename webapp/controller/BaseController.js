sap.ui.define(
	["sap/ui/core/mvc/Controller"],
	function(controller) {
		return controller.extend("hckt.practice21.controller.BaseController", {
			_oCore: sap.ui.getCore(),
			oGetModel: function(model) {
				return this._oCore.getModel(model);
			},
			oSetModel: function(model1,model2) {
				return this._oCore.setModel(model1,model2);
			},
			obyId:function(id){
				 return this.getView().byId(id);
			}
		});
	});