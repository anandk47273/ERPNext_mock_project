// Copyright (c) 2022, anand and contributors
// For license information, please see license.txt

frappe.ui.form.on('Employee Deduction', {
	//code here
});


//every time grabbing dec 31 

// frappe.ui.form.on('Deduction Detail', {

// 	start_date: function(frm) {
	
// 		var end_date = moment(frm.doc.start_date).endOf('month').format('YYYY-MM-DD')
	
// 		$.each(frm.doc.deduction_detail || [], function(i, d) {
	
// 			d.end_date = end_date;
// 		});
	
// 		refresh_field("deduction_detail");
	
// 	}
// });


// [[VEENA]]

// frappe.ui.form.on('Employee Deduction',{
// 	amount:function(frm){
// 		var child = cur_frm.add_child("deduction_calculation");
// 		$.each(frm.doc.deduction_detail, function(i, item) {
			
// 			console.log(d)
// 			console.log(child)
//             child.onetime=item.amount;
// 			child.fieldname="Text" ;
// 			cur_frm.refresh_fields("deduction_calculation");
// 	})
// 	}
// });


// grand_total: function(frm) {
// 	frappe.call('erpnext_mock_project.erpnext_mock_project.doctype.employee_deduction.employee_deduction', {
// 		deduction_detail.start_date: 'any_day'
// 	}).then(r => {
// 		console.log(r.message)
// 	})
	
// }

//  JUST TRYING TO PRINT HELLO BY PYTHON FN.
	//it worked on child table field.
// frappe.ui.form.on('Deduction Detail',{
// 	start_date:function(frm){
// 		frappe.msgprint('hello anand')
// 		}	
// });

///////// AUTO UPDATE LAST DATE IN DEDUCTION CALCULATION.////////
frappe.ui.form.on('Deduction Detail',{
	start_date:function(frm,cdt,cdn){
		var child = locals[cdt][cdn]
		console.log(child)
		frappe.call({
			method:"erpnext_mock_project.erpnext_mock_project.doctype.employee_deduction.employee_deduction.last_day_of_month",
			args:{
				"any_day":child.start_date
			},
			callback:function(r){
				console.log(r);
				if (child.deduction_type =='Onetime'){
					frappe.model.set_value(cdt,cdn,'end_date',r.message);
					cur_frm.refresh_field('end_date');
				}
			}
		})
	
		}	
});



/////////////////////////////////////////////////////////////////////////////////////////////
// /////////// working //////////

frappe.ui.form.on('Deduction Detail',{
	amount:function(frm,cdt,cdn){
		var d = locals[cdt][cdn]
		console.log(d)
		frappe.call({
			method:"erpnext_mock_project.erpnext_mock_project.doctype.employee_deduction.employee_deduction.get_month_and_year",
			args:{
				"put_date":d.start_date
			},
			callback:function(r){
				var child = cur_frm.add_child("deduction_calculation");
				var month_output = r.message;
				if (d.deduction_type =='Onetime'){
					child.month=month_output;
					child.total=d.amount;
					child.onetime = d.amount
				}
				cur_frm.refresh_fields("deduction_calculation");
			}
		})
	}	
});

/////////////////////////////////////////////////////////////////////////////////////////////

///// Date correct format call.
// For every month in betweeen start date and end date.

// frappe.ui.form.on('Deduction Detail',{
// 	amount:function(frm,cdt,cdn){
// 		var x = locals[cdt][cdn]
// 		console.log(x)
// 		frappe.call({
// 			method:"erpnext_mock_project.erpnext_mock_project.doctype.employee_deduction.employee_deduction.get_month_and_year",
// 			args:{
// 				"st_date":x.start_date,
// 				"en_date":x.end_date
// 			},
// 			callback:function(r){
// 				console.log(r);
// 				frappe.msgprint(r);
// 				// var month_output = r.message.split(',')
// 				var month_output = r.message;
// 					// console.log(month_output);
// 				var child = cur_frm.add_child("deduction_calculation");
// 				for (let a in month_output) {
// 					console.log(month_output[a])
// 					child.month = month_output[a]
// 					cur_frm.refresh_fields("deduction_calculation");
					
// 				}
// 				child.month = month_output
// 				// cur_frm.refresh_fields("deduction_calculation");
// 	// 			console.log(d)
// 	// 			console.log(child)
// 				// if(x.deduction_type=='Onetime'){
// 				// 	child.onetime=x.amount;
// 				// }
// 				// if(d.deduction_type=='Recurring'){
// 				// 	child.recurring=x.amount;
// 				// }
// 				// child.total=x.amount
				
				
// 				// child.fieldname="Text" ;
				
// 			}
// 		})
	
// 		}	
// });


////////////// TASKS RELATED TO VALIDATION ///////////////////////////
frappe.ui.form.on('Deduction Detail',{
	end_date:function(frm,cdt,cdn){
		let validate_date = locals[cdt][cdn]
		if (validate_date.end_date < validate_date.start_date){
			frappe.throw('end date should be after start date')
		}
	},
	amount:function(frm,cdt,cdn){
		let validate_amount = locals[cdt][cdn]
		if (validate_amount.amount<=0){
			frappe.throw('Please enter amount.')
		}
	},

})