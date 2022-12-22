import frappe

@frappe.whitelist()
def absent_day(doc,method):
    doc.absent_days = doc.total_working_days-doc.present_days

def validate_total_working_days(doc,method):
    if doc.total_working_days >30:
        frappe.throw('Correct the total workig days')