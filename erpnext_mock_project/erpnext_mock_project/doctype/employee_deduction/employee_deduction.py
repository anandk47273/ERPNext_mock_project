# Copyright (c) 2022, anand and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe import _
from calendar import monthrange,month_abbr
import datetime
import json
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

@frappe.whitelist()
def get_month_and_year(put_date):
    months=['###','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    y = put_date[0:4]
    m = put_date[5:7]
    month=months[int(m)]
    return month + '-' + y


# # GET EVERY MONTH BETWEEN TWO DATES
# @frappe.whitelist()
# def get_month_and_year(st_date,en_date):
#     months=['###','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',
#             'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
#     en_date_m = int(en_date[5:7])
#     st_date_m = int(st_date[5:7])
#     en_date_y = int(en_date[0:4])
#     st_date_y = int(st_date[0:4])
    
#     yr_diff = en_date_y-st_date_y
#     if yr_diff == 0:
#         no_of_month=(en_date_m-st_date_m)
#     if yr_diff > 0:
#         no_of_month=(12*yr_diff)+(en_date_m-st_date_m)
        
#     month=[]   
#     for i in range(no_of_month+1):
#         if st_date_m <=12:
#             y = st_date_y
#             month.append(months[st_date_m]+'-'+str(y))
#             st_date_m +=1
#         else:
#             y = st_date_y+1
#             month.append(months[st_date_m]+'-'+str(y))
#             st_date_m +=1
#     # res = json.dumps(month)
#     # return res
#     d = {}
#     for a,b in enumerate(month):
#         d[a]=b
#     return(d)

        
            
        
