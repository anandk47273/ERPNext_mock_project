# Copyright (c) 2022, anand and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _
from calendar import monthrange

class EmployeeDeduction(Document):
	pass
@frappe.whitelist()
def last_day_of_month(any_day):
    y = any_day[0:4]
    m = any_day[5:7]
    d = any_day[8:10]
    tot_day_in_month = monthrange(int(y),int(m))[1]
    # res = any_day.replace(d,str(tot_day_in_month))
    # res2 = str(tot_day_in_month)+'-'+m+'-'+y
    res3 = y+'-'+m+'-'+str(tot_day_in_month)
    
    return(res3)
