// pages/tax-calculator/tax-calculator.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalIncome: 0,
    socialSecurityDeduction: 0,
    housingFundDeduction: 0,
    deductedIncome: 0,
    tax: 0,
    tax7000: 0,
    tax10000: 0,
    saved7000: 0,
    saved10000: 0
    //netIncome: 0
  },

  backToHome: function () {
    wx.navigateBack({})
  },

  bindTotalIncome: function(e){
    this.setData({
      totalIncome: parseFloat(e.detail.value)
    })
  },
  // 获取税前扣减：
  bindDeduction: function (e) {
    switch (e.currentTarget.dataset.dType){
      case "SS":
        this.setData({
          socialSecurityDeduction: parseFloat(e.detail.value)
        });
        break;
      case "HF":  
        this.setData({
          housingFundDeduction: parseFloat(e.detail.value)
        });
    }
  },

  calculateIncomeTax: function(){
    //let _tax = (this.data.totalIncome - this.data.deduction) * 0.2
    console.log(this.data)

    let deduction = this.data.socialSecurityDeduction + this.data.housingFundDeduction
    let _deductedIncome = this.data.totalIncome - deduction
    let _tax = this.calIncomeTax20110901(_deductedIncome, 3500)
    let _tax7000 = this.calIncomeTax20110901(_deductedIncome, 7000)
    let _tax10000 = this.calIncomeTax20110901(_deductedIncome, 10000)

    this.setData({
      tax: _tax,
      tax7000: _tax7000,
      tax10000: _tax10000,
      saved7000: (_tax - _tax7000).toFixed(2),
      saved10000: (_tax - _tax10000).toFixed(2),
      deductedIncome: _deductedIncome
    })
  },

  calIncomeTax20110901: function(deductedIncome, threshold){
    let _income = deductedIncome - threshold;
    let tax=0;
 
    if (_income<=0)
      tax = 0;
    else if (_income<=1500)
      tax = _income * 0.03;
    else if (_income <= 4500)
      tax = _income * 0.1 - 105;
    else if (_income <= 9000)
      tax = _income * 0.20 - 555;
    else if (_income <= 35000)
      tax = _income * 0.25 - 1005;
    else if (_income <= 55000)
      tax = _income * 0.30 - 2755;
    else if (_income <= 80000)
      tax = _income * 0.35 - 5505;
    else tax = _income * 0.45 - 13505; 
 
    return tax.toFixed(2);
  }
})