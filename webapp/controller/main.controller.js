sap.ui.define(
	["hckt/practice21/controller/BaseController",
		"hckt/practice21/model/model"
	],
	function(baseController, model) {
		baseController.extend("hckt.practice21.controller.main", {
			varX: 10,
			varClear: "y",
			i: 0,
			onInit: function() {
				var jsonModel = model.createJsonModel("model/mockData/data.json");
				this.oSetModel(jsonModel);
				var jsonModel2 = model.createJsonModel("model/mockData/data2.json");
				sap.ui.getCore().setModel(jsonModel2, "2ndJson");
			},
			onGetFullData: function() {
				// Method1- Property Binding.				
				var getLastNameId = this.getView().byId("idempLastName");
				getLastNameId.bindValue("/empStr/lastName");
				// Method2- Property Binding				
				var getSalaryId = this.getView().byId("idEmpSal");
				getSalaryId.bindProperty("value", "/empStr/salary");
			},
			onFlipData: function() {
				var oModel1 = this.oGetModel();
				var oFlipBtn = this.getView().byId("idFlip");
				var oModel2 = this.oGetModel("2ndJson");
				this.oSetModel(oModel1, "2ndJson");
				this.oSetModel(oModel2);
				if (this.varX === 10) {
					this.varX = 20;
					oFlipBtn.setText("DataFlip-JSON2");
					if (this.varClear === "x") {
						oModel2.setProperty("/empStr/lastName", "Alleti");
						oModel2.setProperty("/empStr/salary", "80000");
					}

				} else {
					this.varX = 10;
					oFlipBtn.setText("DataFlip-JSON1");
					if (this.varClear === "x") {
						oModel2.setProperty("/empStr/lastName", "Bollabathula");
						oModel2.setProperty("/empStr/salary", "100000");
					}
				}
			},
			onClear: function() {
				var model1 = this.oGetModel();
				var model2 = this.oGetModel("2ndJson");
				model1.setProperty("/empStr/lastName", "");
				model1.setProperty("/empStr/salary", "");
				model2.setProperty("/empStr/lastName", "");
				model2.setProperty("/empStr/salary", "");
				this.varClear = "x";

			},
			onPush: function() {
				var oModel = this.oGetModel();
				var oTable = oModel.getProperty("/empTab");
				var oStr = oModel.getProperty("/empStr");
				for (this.i = 0; this.i < oTable.length; this.i++) {
					if (oStr.empId === (oTable[this.i].empId)) {
						this.varClear = "z";
					}
				}
				if (this.varClear !== "z") {
					this.varClear = "";
					oTable.push(oStr);
					oModel.setProperty("/empTab", oTable);
				} else {
					window.alert("This Employee Id Already Exist");
				}
			},
			onPop: function() {
				var oModel = this.oGetModel();
				var oTable = oModel.getProperty("/empTab");
				oTable.pop();
				oModel.setProperty("/empTab", oTable);

			},
			onRowSelect: function(event) {
				var selectedRow = event.getParameter("rowContext");
				var sForm = this.getView().byId("idSF");
				sForm.bindElement(selectedRow.sPath);
			},
			onDisable: function() {
				var oModel = this.oGetModel();
				var enableValue = oModel.getProperty("/empStr/enable");
				if (enableValue === true) {
					oModel.setProperty("/empStr/enable", false);
				} else {
					oModel.setProperty("/empStr/enable", true);
				}
			}
		});
	});