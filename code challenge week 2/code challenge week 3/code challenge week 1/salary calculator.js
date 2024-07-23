function calculateNetSalary(basicSalary, benefits) {
     const PAYE_RATES = [
        { limit: 24000, rate: 0.1 },
        { limit: 32333, rate: 0.25 },
        { limit: Infinity, rate: 0.3 }
    ];
    const NHIF_RATES = [

    ];
    const NSSF_RATE = 0.06;

    const grossSalary = basicSalary + benefits;
    let paye = 0;

    for (const bracket of PAYE_RATES) {
        if (grossSalary <= bracket.limit) {
            paye += grossSalary * bracket.rate;
            break;
        } else {
            paye += bracket.limit * bracket.rate;
        }
    }

    const nhif = NHIF_RATES.find(rate => grossSalary <= rate.limit)?.amount || NHIF_RATES[NHIF_RATES.length - 1].amount;
    const nssf = grossSalary * NSSF_RATE;

    const netSalary = grossSalary - paye - nhif - nssf;

    return {
        grossSalary,
        paye,
        nhif,
        nssf,
        netSalary
    };
}

const basicSalary = parseFloat(prompt("Enter basic salary: "));
const benefits = parseFloat(prompt("Enter benefits: "));
const result = calculateNetSalary(basicSalary, benefits);
console.log(result);
