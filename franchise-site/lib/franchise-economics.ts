// Amounts: KRW 10,000 excluding VAT. Planning assumptions, not store results.
export const operatingModel = {
  averageTicket: 11, operatingDays: 26, therapists: 5, beds: 5,
  sessionsPerTherapist: 6, serviceSlotMinutes: 90, dailyHours: 10,
  therapistMonthlyCost: 300, managerMonthlyCost: 350,
  rent: 300, other: 150, depreciation: 200,
  productRate: .10, marketingRate: .10, royaltyRate: .10, paymentRate: .02,
};
export function calculateEconomics(sales: number, ticket = operatingModel.averageTicket) {
  const m = operatingModel;
  const labor = m.therapists * m.therapistMonthlyCost + m.managerMonthlyCost;
  const variableRate = m.productRate + m.marketingRate + m.royaltyRate + m.paymentRate;
  const fixed = labor + m.rent + m.other + m.depreciation;
  const monthlyCapacity = Math.min(m.therapists, m.beds) * m.sessionsPerTherapist * m.operatingDays;
  const customers = sales / ticket;
  const profit = sales * (1-variableRate)-fixed;
  return { labor, variableRate, fixed, monthlyCapacity, customers, profit,
    margin: sales ? profit/sales*100 : 0, dailyCustomers: customers / m.operatingDays,
    utilization: customers/monthlyCapacity*100, breakEven: fixed/(1-variableRate),
    cashFixed: fixed-m.depreciation, reserveThreeMonths: (fixed-m.depreciation)*3,
  };
}
