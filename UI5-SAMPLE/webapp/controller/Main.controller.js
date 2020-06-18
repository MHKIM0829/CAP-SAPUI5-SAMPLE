sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"com/istn/ifl/UI5-SAMPLE/utils/mhkim",
], function (Controller, JSONModel, Utils) {
	"use strict";

	return Controller.extend("com.istn.ifl.UI5-SAMPLE.controller.Main", {
		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			
			this.initViewData = {};
			this.initViewData.footer = {
				iconSrc: "",
				iconColor: "",
				message: "",
				BtnCreateFlow : {
					enabled: false 
				}
			};
			
			this.propInput = {
				inputTITLE : {
					valueState: "None"
				}
			};
			
			this.oPage = this.getView().byId("page");
			this.oModelPage = new JSONModel(this.initViewData);
			
			this.oPage.setModel(this.oModelPage);
			this.oPage.bindElement("/");
			
			this.oCreateFlowHeader = this.getView().byId("form-id-create-flow-header");
			this.oCreateFlowItem = this.getView().byId("table-id-create-flow-item");
			this.oReadFlowHeader = this.getView().byId("table-id-read-flow-header");
			this.oReadFlowItem = this.getView().byId("table-id-read-flow-item");
			
			this.setCreateFlowHeader();
			this.getReadFlowHeader();
		},
		
		setCreateFlowHeader: function() {
			
			this.initCreateFlowHeader = {
				FLOWCODE: "",
				FLOWCNT: "",
				TITLE:"",
				DETAIL: []
			};
			
			var oCreateFlowHeader = JSON.parse(JSON.stringify(this.initCreateFlowHeader));
			oCreateFlowHeader.propInput = JSON.parse(JSON.stringify(this.propInput));
			
			oCreateFlowHeader.FLOWCODE = "BS001";
			oCreateFlowHeader.FLOWCNT = "001";
			oCreateFlowHeader.CREATOR_LOGIN_ID = "ITK00010";
			oCreateFlowHeader.CREATOR_NAME = "생성자";
			oCreateFlowHeader.CREATOR_PERNR = "100000000";
			oCreateFlowHeader.CREATOR_ORGEH = "ITORG11100";
			oCreateFlowHeader.CREATOR_ORGTX = "재무팀";
			oCreateFlowHeader.TITLE = "결재 테스트";
			
			this.oCreateFlowHeader.setModel(new JSONModel(oCreateFlowHeader));
			this.oCreateFlowHeader.bindElement('/');
		},
		
		onHeaderConfirm: function(oEvent) {
			
			this.initCreateFlowItem = {
				FLOWCODE: "",
				FLOWCNT: "",
				FLOWIT: ""
			};
			
			var oPageData = this.oPage.getModel().getData();
			var oCreateFlowHeadeData = this.oCreateFlowHeader.getModel().getData();
			
			if(!Utils.isEmpty(oCreateFlowHeadeData.TITLE)) oPageData.footer.BtnCreateFlow.enabled = true;
			else oPageData.footer.BtnCreateFlow.enabled = false;
			
			
			if(Utils.isEmpty(oCreateFlowHeadeData.TITLE)) oCreateFlowHeadeData.propInput.inputTITLE.valueState = "Error";
			else oCreateFlowHeadeData.propInput.inputTITLE.valueState = "None";
			
			if(!Utils.isEmpty(oCreateFlowHeadeData.TITLE)) {
				
				var FLOWIT = 1;
				
				oCreateFlowHeadeData.DETAIL = [];
				for(var idx=0; idx<3; idx++) {
					
					var temp = JSON.parse(JSON.stringify(this.initCreateFlowItem));
					temp.FLOWCODE = oCreateFlowHeadeData.FLOWCODE;
					temp.FLOWCNT = oCreateFlowHeadeData.FLOWCNT;
					temp.FLOWIT = Utils.setLeadingZero(FLOWIT, 2);
					temp.APPROVE_LOGIN_ID = "ITK" + Utils.setLeadingZero(FLOWIT, 5);
					temp.APPROVER_SAP_ID = "ITK" + Utils.setLeadingZero(FLOWIT, 5);
					temp.APPROVER_NAME = "결재자" + Utils.setLeadingZero(FLOWIT, 3);
					temp.APPROVER_PERNR = Utils.setLeadingZero(FLOWIT, 10);
					temp.APPROVER_ORGEH = "ITORG" + Utils.setLeadingZero(FLOWIT, 5);
					temp.APPROVER_ORGTX = "부서" + Utils.setLeadingZero(FLOWIT, 3);
					
					oCreateFlowHeadeData.DETAIL.push(temp);
					FLOWIT++;
				}
				
				this.oCreateFlowHeadeData = oCreateFlowHeadeData;
			}
			
			this.oPage.setModel(new JSONModel(oPageData));
			this.oCreateFlowHeader.setModel(new JSONModel(oCreateFlowHeadeData));
			this.oCreateFlowItem.setModel(new JSONModel(oCreateFlowHeadeData.DETAIL));
			this.oCreateFlowItem.bindRows("/");

		},
		
		onCreateFlow: function(oEvent) {
			
			var that =  this; 
			
			var oPageData = this.oPage.getModel().getData();
			var oHeaderData = this.oCreateFlowHeader.getModel().getData();
			delete oHeaderData.propInput;
			
			for(var idx=0, length = oHeaderData.DETAIL.length; idx<length; idx++) {
				oHeaderData.DETAIL[idx].WFIT_TYPE = "S";
				if(idx === 0) {
					oHeaderData.DETAIL[idx].IT_WFSTAT = "P";
				}
			}
			
			/*
			if(data.error) {
				oPageData.footer.iconSrc = "sap-icon://error";
				oPageData.footer.iconColor = "#B00";
				oPageData.footer.message = "결재 생성 실패";
			} else {
				oPageData.footer.iconSrc = "sap-icon://message-success";
				oPageData.footer.iconColor = "#2B7C2B";
				oPageData.footer.message = "결재 생성 " + data.FLOWNO;	
			}
			that.oPage.setModel(new JSONModel(oPageData));
			that.getReadFlowHeader();
			*/
			
			
		},
		
		getReadFlowHeader: function() {
			
			var that =  this; 
			
			/*
			data.value.sort(function(a, b) {
			    return a.CREATE_DATE < b.CREATE_DATE ? -1 : a.CREATE_DATE > b.CREATE_DATE ? 1 : 0 
			    	|| a.CREATE_TIME < b.CREATE_TIME ? -1 : a.CREATE_TIME > b.CREATE_TIME ? 1 : 0 ;
			});
					
			that.oReadFlowHeader.setModel(new JSONModel(data.value));
			that.oReadFlowHeader.bindRows("/");
			*/
		},
		
		onClickHeader: function (oEvent) {
			
			var that = this;
			
			var oTable = this.getView().byId('table-id-read-flow-header');
			var oTableData = oTable.getModel().getData();
			
			if(!Utils.isEmpty(oTableData[oEvent.mParameters.rowIndex])) {
				
				var sQuery = "(" + "FLOWNO='"+ oTableData[oEvent.mParameters.rowIndex].FLOWNO + "'," 
									+ "FLOWCODE='"+ oTableData[oEvent.mParameters.rowIndex].FLOWCODE  + "'," 
									+ "FLOWCNT='"+ oTableData[oEvent.mParameters.rowIndex].FLOWCNT + "'" + ")?$expand=DETAIL";
									
									
			
				
				/*
				that.oReadFlowItem.setModel(new JSONModel(data.DETAIL));
				that.oReadFlowItem.bindRows("/");
				*/
			}
		},
		
		onDeleteFlow : function(oEvent) {
			
			var that = this;
			
			var oPageData = this.oPage.getModel().getData();
			var tableData = this.oReadFlowHeader.getModel().getData();
			
			var selIdx = this.oReadFlowHeader.getSelectedIndices();
			
			var oRequest = {
				requests : []
			};
			
			var requestItem = {
				atomicityGroup : "",
				id : "",
				method : "",
				url : ""
			};
			
			for (var idx = 0; idx < selIdx.length; idx++) {
				
				var item = JSON.parse(JSON.stringify(requestItem));
				item.atomicityGroup = "group1";
				item.id = Utils.setLeadingZero(idx+1, 3);
				item.method = "DELETE";
				item.url = "IFLT0001(" + "FLOWNO='"+ tableData[selIdx[idx]].FLOWNO + "'," 
										+ "FLOWCODE='"+ tableData[selIdx[idx]].FLOWCODE  + "'," 
										+ "FLOWCNT='"+ tableData[selIdx[idx]].FLOWCNT + "'" + ")";
				
				oRequest.requests.push(item);
			}
				
				/*
				if(data.responses[0].status === 204) {
					oPageData.footer.iconSrc = "sap-icon://message-success";
					oPageData.footer.iconColor = "#2B7C2B";
					oPageData.footer.message = "결재 삭제 완료" ;	
				 } else {
				 	oPageData.footer.iconSrc = "sap-icon://error";
					oPageData.footer.iconColor = "#B00";
					oPageData.footer.message = "결재 삭제 실패";
				 }
				 
				 that.oPage.setModel(new JSONModel(oPageData));
				 that.oReadFlowItem.setModel(new JSONModel(data.DETAIL));
				 that.getReadFlowHeader();
				*/
			});
		},
		
	});
});