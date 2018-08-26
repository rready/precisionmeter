using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Meter.ViewModels
{
    public class CustomerSelectViewModel
    {
        // Display Attribute will appear in the Html.LabelFor
        [Display(Name = "Select Customer")]
        public int SelectedCustId { get; set; }
        public IEnumerable<SelectListItem> CustomerName { get; set; }
    }
}