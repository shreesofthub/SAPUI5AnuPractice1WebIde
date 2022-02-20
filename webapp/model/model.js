sap.ui.define(
	["sap/ui/model/json/JSONModel"],
	function(json) {
		return {
			createJsonModel: function(sPath) {
				var oJsonModel = new json();
				oJsonModel.loadData(sPath);
				return oJsonModel;
			}
		};
	});