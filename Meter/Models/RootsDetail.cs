//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Meter.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class RootsDetail
    {
        public int sysid { get; set; }
        public int rheaderId { get; set; }
        public Nullable<int> RunNumber { get; set; }
        public Nullable<System.DateTime> Time { get; set; }
        public Nullable<int> FPC { get; set; }
        public string FlowRanges { get; set; }
        public Nullable<int> IndFlowRate { get; set; }
        public Nullable<int> ProverCount { get; set; }
        public Nullable<decimal> RunningtimeSec { get; set; }
        public Nullable<decimal> CalFlowRate { get; set; }
        public Nullable<decimal> UnCorproof { get; set; }
        public Nullable<decimal> PPercent { get; set; }
        public string Pon { get; set; }
        public Nullable<decimal> CorrectedProof { get; set; }
        public string Notes { get; set; }
    
        public virtual RootsHeader RootsHeader { get; set; }
    }
}
