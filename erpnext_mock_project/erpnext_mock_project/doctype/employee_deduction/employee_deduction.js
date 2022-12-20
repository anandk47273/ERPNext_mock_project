// Copyright (c) 2022, anand and contributors
// For license information, please see license.txt

frappe.ui.form.on('Employee Deduction', {
	//code here
});

// Performing actions on child table

// frappe.ui.form.on('Deduction Detail', {
// 	deduction_type:function(frm){
// 		if(frm.doc.deduction_type == 'Onetime'){
// 			//frm.set_df_property("end_date", "read_only",1);
// 			frm.fields_dict.items.grid.update_docfield_property('qty', "read_only", 1);
// 			frappe.msgprint("trigger on deduction type");
// 		}
// 	}
// });


// frappe.ui.form.on('Deduction Detail', {
// 	deduction_type:function(frm){
// 		if(frm.doc.deduction_type == 'Onetime'){
// 			var df = frappe.meta.get_docfield("Deduction Detail","end_date", cur_frm.doc.name);
// 			df.read_only = 1;
// 			console.log(df)
// 			frappe.msgprint(df)
// 		}
// 	}
// });

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
// 	start_date:function(frm){
// 		$.each(frm.doc.deduction_detail, function(i, item) {
// 			frappe.call({
// 				method:"erpnext_mock_project.erpnext_mock_project.doctype.employee_deduction.employee_deduction.last_day_of_month",
// 				args:{
// 					any_day:item.start_date
// 				},
// 				callback:function(r){
// 					console.log(r)
// 				}
// 			});
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
				frappe.msgprint(r);
				frappe.model.set_value(cdt,cdn,'end_date',r.message);
				cur_frm.refresh_field('end_date');
			}
		})
	
		}	
});