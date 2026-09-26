export const research = {
  acoustics: {
    code: "CT-01",
    name: "Acoustic panels",
    material: "panel",
    feedstock: "COCONUT HUSK / COIR FIBER",
    stages: [
      [
        "Collection",
        "Coconut husks are collected as the fiber-rich feedstock. Keeping husk and shell streams separate makes this pathway distinct from our activated-carbon research.",
        "collect",
      ],
      [
        "Cleaning",
        "Dirt and unwanted matter are removed from the collected husks to prepare a more consistent starting material. Cleaning requirements need to be assessed against water use.",
        "clean",
      ],
      [
        "Fiber extraction",
        "Coir fibers are separated from the husk. The recovered fiber network forms the structural basis of the acoustic panel.",
        "fiber",
      ],
      [
        "Drying",
        "Extracted fibers are dried to control moisture before further processing. The drying approach and energy demand are part of process development.",
        "dry",
      ],
      [
        "Fiber treatment",
        "The fiber surface is treated to support binder compatibility and material durability. Treatment conditions remain a formulation and validation question.",
        "treat",
      ],
      [
        "Size reduction",
        "Fibers are reduced to selected lengths. Fiber size is one of the variables investigated alongside thickness, density and binder ratio.",
        "cut",
      ],
      [
        "Binder mixing",
        "Prepared fibers are mixed with a binder. Bio-based binder options are investigated to balance cohesion, acoustic porosity and material impact.",
        "mix",
      ],
      [
        "Moulding",
        "The fiber-binder mixture is distributed in a mould to establish the panel shape and a consistent structure before compression.",
        "mould",
      ],
      [
        "Compression",
        "The moulded mixture is pressed into a cohesive panel. Compaction must balance mechanical integrity with the interconnected voids needed for absorption.",
        "press",
      ],
      [
        "Curing",
        "The binder is allowed to set under suitable curing conditions. The conditions depend on the binder system and require process validation.",
        "cure",
      ],
      [
        "Finishing",
        "Edges and surfaces are finished. A dust-resistant, breathable fabric layer is part of the design approach; its effect on acoustic response must also be tested.",
        "finish",
      ],
      [
        "Acoustic testing",
        "Samples are assessed for sound absorption coefficient and NRC alongside density, moisture resistance, compression/flexural strength and durability. No measured results are published here.",
        "test",
      ],
    ],
    metrics: [
      [
        "Sound absorption",
        "Sound absorption coefficient",
        "Absorption depends on frequency, specimen thickness, mounting and the test method. A useful comparison needs frequency-dependent results under matched conditions.",
        "Frequency-dependent absorption / results not supplied",
      ],
      [
        "NRC",
        "Noise Reduction Coefficient",
        "NRC is a summary measure of absorption, not a soundproofing rating. A reported value needs a defined test method and documented sample construction.",
        "NRC / validated values not supplied",
      ],
      [
        "Density",
        "Panel density",
        "Density connects material use, handling and internal structure. A denser panel is not automatically a better absorber; compare density together with acoustic response.",
        "Mass per volume / results not supplied",
      ],
      [
        "Moisture",
        "Moisture resistance",
        "Samples need defined exposure conditions and measurements of changes in dimensions, integrity and acoustic behavior. No moisture-resistance class is claimed.",
        "Defined exposure response / results not supplied",
      ],
      [
        "Strength",
        "Compression & flexural strength",
        "Mechanical testing examines how the panel withstands compressive loads and bending. Specimen geometry and conditioning must be stated before comparing materials.",
        "Mechanical response / results not supplied",
      ],
      [
        "Durability",
        "Durability over use",
        "Longer-term performance needs repeatable aging and handling evaluations. No validated service-life claim is available at this development stage.",
        "Aging response / results not supplied",
      ],
    ],
    references: ["Mineral wool panel", "PET felt panel", "Wood-fiber panel"],
    sample: "Coir panel concept",
  },
  energy: {
    code: "CT-02",
    name: "Energy storage",
    material: "carbon",
    feedstock: "COCONUT SHELL / ACTIVATED CARBON",
    stages: [
      [
        "Coconut shell waste",
        "Dense coconut shells are the starting feedstock. This stream is separate from the husk/coir material used in the acoustic-panel pathway.",
        "collect",
      ],
      [
        "Cleaning & drying",
        "Shells are cleaned and dried before processing. Consistent feedstock preparation supports controlled downstream carbonization and activation studies.",
        "clean",
      ],
      [
        "Size reduction",
        "The dried shells are reduced in size to prepare a manageable feedstock for carbonization. Particle preparation affects process consistency.",
        "cut",
      ],
      [
        "Carbonization",
        "The prepared shells are heated under controlled, oxygen-limited conditions to produce a carbon-rich char. Conditions and energy demand require careful development.",
        "furnace",
      ],
      [
        "Grinding / sieving",
        "Carbonized material is ground and sieved to a selected particle range, supporting more consistent activation and subsequent electrode preparation.",
        "sieve",
      ],
      [
        "Chemical activation",
        "Activating-agent ratio, temperature and time are varied to develop accessible porosity. The aim is to understand their relationship with electrochemical performance.",
        "activate",
      ],
      [
        "Washing & drying",
        "The activated material is washed and dried to remove residual processing chemicals. Water demand, washing effectiveness and waste handling are scale-up considerations.",
        "clean",
      ],
      [
        "Activated carbon",
        "The resulting porous carbon is characterized for surface area and pore structure. Surface area alone does not establish useful electrode performance.",
        "pores",
      ],
      [
        "Electrode fabrication",
        "Activated carbon is incorporated into an electrode formulation and applied to a suitable current collector. Formulation and loading affect measured behavior.",
        "electrode",
      ],
      [
        "Supercapacitor assembly",
        "Electrodes are integrated with an electrolyte and separator in a test-cell configuration. Cell design and operating conditions must be documented.",
        "assemble",
      ],
      [
        "Electrochemical testing",
        "Testing evaluates capacitance, energy/power density, internal resistance, charge-discharge behavior and cycling stability. Device-scale conclusions need device-scale evidence.",
        "test",
      ],
    ],
    metrics: [
      [
        "Pore structure",
        "Surface area & pore structure",
        "Characterization considers surface area, pore sizes and accessibility. More surface area does not automatically mean more usable capacitance: ions must reach the surface.",
        "Characterization results / not supplied",
      ],
      [
        "Capacitance",
        "Specific capacitance",
        "Report mass normalization, electrolyte, loading and test configuration. Electrode-level values and full-device values must not be treated as interchangeable.",
        "Capacitance / validated values not supplied",
      ],
      [
        "Energy / power",
        "Energy & power density",
        "These quantities depend on the cell configuration, voltage window and calculation basis. A meaningful comparison must use the same basis and stated operating conditions.",
        "Energy-power relationship / results not supplied",
      ],
      [
        "Resistance",
        "Internal resistance",
        "Resistance influences power delivery and losses. Interpretation needs the measurement method, cell geometry, electrolyte and contact conditions.",
        "Internal resistance / results not supplied",
      ],
      [
        "Charge / discharge",
        "Charge-discharge behavior",
        "The curve shape, operating window and rate response help characterize the system. Measurements need defined current, voltage limits and test conditions.",
        "Measured charge-discharge curves / not supplied",
      ],
      [
        "Cycling",
        "Cycling stability",
        "Retention needs a stated cycling protocol and a measured record. No cycle count, retention percentage or lifetime claim is published here.",
        "Measured cycling history / not supplied",
      ],
      [
        "Scale-up",
        "Cost & scalability",
        "Assessment must include feedstock logistics, carbon yield, chemical use, washing, energy demand, fabrication and quality consistency. No cost advantage is claimed.",
        "Process-cost comparison / not established",
      ],
    ],
    references: ["Commercial activated carbon", "Alternative biomass carbon"],
    sample: "Shell-carbon concept",
  },
};
