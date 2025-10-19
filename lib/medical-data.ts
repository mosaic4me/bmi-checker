export interface ReproductiveHealthImpact {
  category: string;
  impacts: {
    fertility: string[];
    pregnancy: string[];
    menstrual: string[];
    longTerm: string[];
  };
  statistics: {
    finding: string;
    value: string;
    source: string;
  }[];
  whoEvidence: {
    summary: string;
    keyPoints: string[];
    citation: string;
  };
}

export const REPRODUCTIVE_HEALTH_DATA: Record<string, ReproductiveHealthImpact> = {
  underweight: {
    category: 'Underweight (BMI < 18.5)',
    impacts: {
      fertility: [
        'Anovulatory infertility (reduced or absent ovulation)',
        'Hypothalamic amenorrhea (absence of menstruation)',
        'Reduced estrogen production affecting fertility',
        'Longer time to conception',
        'Increased risk of ovulatory dysfunction'
      ],
      pregnancy: [
        'Increased risk of preterm birth',
        'Low birth weight babies',
        'Nutritional deficiencies affecting fetal development',
        'Higher risk of delivery complications',
        'Potential for intrauterine growth restriction (IUGR)'
      ],
      menstrual: [
        'Irregular menstrual cycles',
        'Amenorrhea (absence of periods)',
        'Functional hypothalamic amenorrhea (FHA)',
        'Reduced follicle development',
        'Disrupted hormonal balance'
      ],
      longTerm: [
        'Bone density loss (osteoporosis risk)',
        'Cardiovascular health concerns',
        'Compromised reproductive lifespan',
        'Nutritional deficiency-related complications'
      ]
    },
    statistics: [
      {
        finding: 'Ovulatory dysfunction',
        value: 'Underweight women have significantly increased risk of anovulatory infertility',
        source: 'PMC Articles on Underweight and Reproductive Health, 2024'
      },
      {
        finding: 'Preterm birth risk',
        value: 'Babies born to underweight mothers at higher risk for premature birth',
        source: 'WHO Maternal Health Guidelines'
      },
      {
        finding: 'Amenorrhea prevalence',
        value: 'Rapid weight loss and low BMI strongly associated with hypothalamic amenorrhea',
        source: 'ScienceDirect: Effect of Underweight on Reproduction, 2020'
      }
    ],
    whoEvidence: {
      summary: 'WHO classifies underweight as BMI < 18.5 kg/m². Research consistently shows underweight status negatively impacts reproductive health through hormonal disruption and nutritional deficiency.',
      keyPoints: [
        'Underweight women experience ovulation problems due to insufficient energy reserves',
        'Low body weight leads to reduced estrogen production, causing irregular or absent periods',
        'Functional hypothalamic amenorrhea occurs when the body lacks enough energy for normal reproductive function',
        'Pregnancy outcomes are compromised with increased risks of preterm delivery and low birth weight',
        'African populations follow WHO standard BMI classifications; however, body composition variations exist and may require individual clinical assessment'
      ],
      citation: 'WHO BMI Classifications & Systematic Reviews: PMC4426152, ScienceDirect (2020), Office on Women\'s Health'
    }
  },

  normal: {
    category: 'Normal Weight (BMI 18.5-24.9)',
    impacts: {
      fertility: [
        'Optimal fertility and regular ovulation',
        'Healthy hormonal balance supporting conception',
        'Normal time to conception',
        'Regular menstrual cycles',
        'Optimal oocyte (egg) quality'
      ],
      pregnancy: [
        'Lower risk of pregnancy complications',
        'Reduced gestational diabetes risk',
        'Lower preeclampsia risk',
        'Healthy birth weight babies',
        'Optimal maternal-fetal health outcomes'
      ],
      menstrual: [
        'Regular menstrual cycles (21-35 day cycles)',
        'Normal hormone levels (estrogen, progesterone)',
        'Consistent ovulation patterns',
        'Reduced menstrual disorders'
      ],
      longTerm: [
        'Maintained reproductive lifespan',
        'Lower risk of reproductive cancers',
        'Healthy bone density',
        'Cardiovascular health preservation'
      ]
    },
    statistics: [
      {
        finding: 'Optimal fertility outcomes',
        value: 'Normal weight women have baseline optimal reproductive health outcomes',
        source: 'WHO Healthy Weight Guidelines'
      },
      {
        finding: 'Pregnancy complication rates',
        value: 'Lowest rates of gestational diabetes, preeclampsia, and delivery complications',
        source: 'American College of Obstetricians and Gynecologists (ACOG)'
      }
    ],
    whoEvidence: {
      summary: 'WHO defines normal weight as BMI 18.5-24.9 kg/m². This range is associated with optimal reproductive health outcomes, healthy fertility, and lowest pregnancy complication rates.',
      keyPoints: [
        'Normal BMI supports healthy ovulation and regular menstrual cycles',
        'Balanced body weight maintains optimal hormone production for fertility',
        'Pregnancy outcomes are most favorable within normal BMI range',
        'Lower risk of both underweight and overweight-related complications',
        'Recommended target weight range for women planning conception'
      ],
      citation: 'WHO BMI Classifications & Global Reproductive Health Standards'
    }
  },

  overweight: {
    category: 'Overweight (BMI 25-29.9)',
    impacts: {
      fertility: [
        'Reduced clinical pregnancy rates (OR 0.76)',
        'Longer ovarian stimulation duration required',
        'Reduced oocyte (egg) quantity and quality',
        'Increased risk of polycystic ovary syndrome (PCOS)',
        'Ovulatory dysfunction in some cases'
      ],
      pregnancy: [
        'Increased gestational diabetes risk',
        'Elevated preeclampsia risk',
        'Higher cesarean delivery likelihood',
        'Increased risk of macrosomia (large baby)',
        'Potential for labor complications'
      ],
      menstrual: [
        'Irregular menstrual cycles',
        'Increased PCOS prevalence',
        'Hormonal imbalances',
        'Heavier menstrual bleeding potential'
      ],
      longTerm: [
        'Increased cardiovascular disease risk',
        'Higher risk of metabolic syndrome',
        'Type 2 diabetes development risk',
        'Reproductive health impacts over time'
      ]
    },
    statistics: [
      {
        finding: 'Clinical pregnancy rates',
        value: 'Women with BMI ≥25 less likely to achieve clinical pregnancy (OR 0.76, 95% CI 0.62-0.93, p=0.007)',
        source: 'Systematic Review & Meta-Analysis: Impact of BMI on Fertility (PMC11529583, 2024)'
      },
      {
        finding: 'Ovarian stimulation requirements',
        value: 'Overweight women required longer duration of stimulation and obtained reduced oocytes',
        source: 'PMC11529583: BMI and Fertility Meta-Analysis, 2024'
      },
      {
        finding: 'Gestational diabetes',
        value: 'Overweight women have 2-3 times increased risk of gestational diabetes compared to normal weight',
        source: 'FIGO Literature Review on Obesity Challenges, 2023'
      }
    ],
    whoEvidence: {
      summary: 'WHO defines overweight as BMI 25-29.9 kg/m². Global estimates show obesity rates tripling since 1975, with 20% of reproductive-age women expected to be obese by 2025. Overweight status significantly impacts fertility and pregnancy outcomes.',
      keyPoints: [
        'Overweight women experience reduced fertility with longer time to conception',
        'Clinical pregnancy success rates are statistically lower (24% reduction in odds)',
        'Ovarian reserve and egg quality are compromised requiring more intensive fertility treatments',
        'Pregnancy risks include gestational diabetes, hypertensive disorders, and delivery complications',
        'Weight reduction of 5-10% can significantly improve reproductive outcomes',
        'African populations use WHO standard BMI cutoffs; some research suggests higher thresholds (BMI ≥27) may indicate increased metabolic risk in certain African populations'
      ],
      citation: 'WHO Global Health Observatory + Systematic Reviews: PMC11529583 (2024), FIGO International Journal (2023), PMC4456969'
    }
  },

  obese: {
    category: 'Obese (BMI ≥ 30)',
    impacts: {
      fertility: [
        'Significantly reduced pregnancy rates (OR 0.61)',
        'Anovulatory infertility and ovulatory dysfunction',
        'Strong association with polycystic ovary syndrome (PCOS)',
        'Higher miscarriage risk',
        'Reduced success rates in assisted reproductive technology (IVF)'
      ],
      pregnancy: [
        'Gestational diabetes (2-3x risk increase)',
        'Preeclampsia (2-3x risk increase)',
        'Macrosomia and birth complications',
        'Increased cesarean delivery rates',
        'Postpartum hemorrhage risk',
        'Wound infection and healing complications'
      ],
      menstrual: [
        'Irregular or absent menstrual cycles',
        'High prevalence of PCOS',
        'Severe hormonal imbalances',
        'Insulin resistance affecting ovulation',
        'Chronic anovulation'
      ],
      longTerm: [
        'Reproductive lifespan reduction',
        'Early menopause risk',
        'Metabolic syndrome',
        'Cardiovascular disease',
        'Type 2 diabetes',
        'Increased risk of reproductive cancers (endometrial, breast)'
      ]
    },
    statistics: [
      {
        finding: 'Clinical pregnancy rates',
        value: 'Women with BMI ≥30 have further decreased likelihood of clinical pregnancy (OR 0.61, 95% CI 0.39-0.98, p=0.04)',
        source: 'Systematic Review: Impact of BMI on Fertility (PMC11529583, 2024)'
      },
      {
        finding: 'Gestational diabetes and preeclampsia',
        value: '2-3 times increased risk for both conditions in obese women compared to normal weight',
        source: 'PMC2970793: Impact of Female Obesity on Fertility Treatment'
      },
      {
        finding: 'IVF outcomes with PCOS',
        value: 'High BMI significantly impacts pregnancy outcomes in women with PCOS undergoing IVF',
        source: 'PMC10970739: Impact of High BMI on PCOS Pregnancy Outcomes, 2024'
      },
      {
        finding: 'Global obesity prevalence',
        value: 'WHO estimates 20% of reproductive-age women will be obese by 2025, with rates tripling since 1975',
        source: 'WHO Global Health Observatory Data'
      }
    ],
    whoEvidence: {
      summary: 'WHO defines obesity as BMI ≥ 30 kg/m². Obesity represents a significant global public health challenge affecting reproductive health through multiple mechanisms including hormonal disruption, insulin resistance, and inflammatory processes.',
      keyPoints: [
        'Obesity dramatically reduces natural fertility with 39% decreased odds of clinical pregnancy',
        'Ovulatory dysfunction and PCOS are strongly linked to obesity through insulin resistance',
        'Pregnancy complications are substantially elevated including gestational diabetes, preeclampsia, and cesarean delivery',
        'Assisted reproductive technology (IVF) success rates are lower in obese women',
        'Weight loss interventions before conception improve fertility and pregnancy outcomes',
        'Obesity affects long-term health including cardiovascular disease, diabetes, and reproductive cancers',
        'African women follow WHO BMI standards; some studies suggest metabolic risk thresholds may differ, emphasizing need for individualized clinical assessment'
      ],
      citation: 'WHO Guidelines + Comprehensive Reviews: PMC11529583 (2024), PMC4456969, PMC2970793, FIGO Literature Review (2023), ASRM Obesity and Reproduction (2021)'
    }
  }
};
