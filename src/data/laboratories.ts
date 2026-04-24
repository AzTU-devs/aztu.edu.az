import { DepartmentLaboratories } from "@/types/laboratory";

export const laboratoriesData: DepartmentLaboratories[] = [
  {
    department: {
      az: "Elektrotexnika kafedrası",
      en: "Electrical Engineering Department"
    },
    labs: [
      {
        id: "electrical-machines-and-drive-control",
        name: {
          az: "Elektrik maşınları və intiqalların idarə edilməsi laboratoriyası",
          en: "Electrical Machines and Drive Control Laboratory"
        },
        department: {
          az: "Elektrotexnika kafedrası",
          en: "Electrical Engineering Department"
        },
        description: {
          az: "Elektrik maşınlarının iş prinsiplərinin praktiki öyrənilməsi üçün nəzərdə tutulmuşdur. AC/DC mühərrikləri, generatorlar və transformatorlar daxil olmaqla müxtəlif maşınlar üçün təlim stendləri ilə təchiz edilmişdir.",
          en: "Designed for the practical study of electrical machine operating principles. Equipped with training stands for various machines including AC/DC motors, generators, and transformers."
        },
        educationalObjectives: {
          az: "Tələbələrə elektrik maşınlarının iş prinsiplərini öyrətmək, mühərrik və generatorların iş rejimlərini tədqiq etmək və qoşulma sxemlərini mənimsətmək.",
          en: "To teach the operating principles of electrical machines, study operating modes of motors and generators, and master connection schemes."
        },
        contact: "IV bina, 008-ci otaq | Məsul şəxs: Məmmədov Əyyar | eyyar.memmedov@aztu.edu.az"
      },
      {
        id: "power-plants-and-substations-simulator",
        name: {
          az: "Elektrik stansiyaları və yarımstansiyalar simulyator laboratoriyası",
          en: "Power Plants and Substations Simulator Laboratory"
        },
        department: {
          az: "Elektrotexnika kafedrası",
          en: "Electrical Engineering Department"
        },
        description: {
          az: "Müasir simulyatorlardan istifadə edərək enerji sisteminin idarə edilməsi, normal və qəza rejimlərinin tənzimlənməsi üzrə təlimlər keçirilir.",
          en: "Training on power system management, regulation of normal and emergency modes using modern simulators."
        },
        educationalObjectives: {
          az: "Enerji sistemlərinin istismarı, dövrə analizi və real vaxt rejimində qərar qəbuletmə vərdişlərini inkişaf etdirmək.",
          en: "To develop skills in power system operation, circuit analysis, and real-time decision-making."
        },
        contact: "IV bina, 4-cü mərtəbə, 407-ci otaq | Məsul şəxs: Fəttayev Hikmət | hikmet.fettayev@aztu.edu.az"
      },
      {
        id: "electrical-measurements-and-instrumentation",
        name: {
          az: "Elektrik ölçmələri və cihazqayırma laboratoriyası",
          en: "Electrical Measurements and Instrumentation Laboratory"
        },
        department: {
          az: "Elektrotexnika kafedrası",
          en: "Electrical Engineering Department"
        },
        description: {
          az: "Elektrik cihazlarının yoxlanılması, kalibrlənməsi və ölçmə diapazonlarının genişləndirilməsinə fokuslanır.",
          en: "Focuses on checking, calibrating, and expanding measurement ranges of electrical devices."
        },
        educationalObjectives: {
          az: "Dəqiq ölçmə texnikası, cihazların kalibrlənməsi və xətaların təyin edilməsi qaydalarını mənimsətmək.",
          en: "To teach precise measurement techniques, instrument calibration, and error determination procedures."
        },
        contact: "IV bina, 3-cü mərtəbə, 302-ci otaq | Məsul şəxs: Nemətov Vasif | vasif.neymatov@aztu.edu.az"
      },
      {
        id: "theory-of-electric-circuits",
        name: {
          az: "Elektrik dövrələri nəzəriyyəsi laboratoriyası",
          en: "Theory of Electric Circuits Laboratory"
        },
        department: {
          az: "Elektrotexnika kafedrası",
          en: "Electrical Engineering Department"
        },
        description: {
          az: "Dəyişən və sabit cərəyan dövrələrinin analizi və fundamental elektrik qanunlarının praktiki tədqiqi üçün yaradılmışdır.",
          en: "Established for the analysis of AC/DC circuits and practical study of fundamental electrical laws."
        },
        educationalObjectives: {
          az: "Dövrə strukturunu, gərginlik, cərəyan və müqavimət arasındakı əlaqələri praktiki təcrübələrlə öyrətmək.",
          en: "To teach circuit structure and the relationships between voltage, current, and resistance through practical experiments."
        },
        contact: "IV bina, 3-cü mərtəbə, 303-cü otaq | Məsul şəxs: Fəttayev Hikmət | hikmet.fettayev@aztu.edu.az"
      },
      {
        id: "cable-engineering-and-electrical-materials",
        name: {
          az: "Kabel mühəndisliyi və elektrotexniki materiallar laboratoriyası",
          en: "Cable Engineering and Electrical Materials Laboratory"
        },
        department: {
          az: "Elektrotexnika kafedrası",
          en: "Electrical Engineering Department"
        },
        description: {
          az: "Kabel texnologiyalarının və elektrotexniki materialların (keçiricilər, yarımkeçiricilər, dielektriklər) xassələrinin tədqiqi.",
          en: "Investigation of cable technologies and properties of electrotechnical materials (conductors, semiconductors, dielectrics)."
        },
        educationalObjectives: {
          az: "Kabel konstruksiyalarını, izolyasiya materiallarını və onların enerji sistemlərindəki rolunu öyrətmək.",
          en: "To teach cable structures, insulation materials, and their role in power systems."
        },
        contact: "IV bina, 3-cü mərtəbə, 307-ci otaq | Məsul şəxs: Camalov Mehdi | mehticamal@aztu.edu.az"
      },
      {
        id: "electronics",
        name: {
          az: "Elektronika laboratoriyası",
          en: "Electronics Laboratory"
        },
        department: {
          az: "Elektrotexnika kafedrası",
          en: "Electrical Engineering Department"
        },
        description: {
          az: "Yarımkeçirici elementlərin, diodların, tranzistorların və inteqral sxemlərin praktiki tətbiqi və analizi.",
          en: "Practical application and analysis of semiconductor elements, diodes, transistors, and integrated circuits."
        },
        educationalObjectives: {
          az: "Elektron sxemlərin qurulması, parametrlərin ölçülməsi və nəzəri biliklərin tətbiqi bacarıqlarını aşılamaq.",
          en: "To instill skills in building electronic circuits, measuring parameters, and applying theoretical knowledge."
        },
        contact: "IV bina, 3-cü mərtəbə, 308-ci otaq | Məsul şəxs: Yusifov Samir | samir.yusifov@aztu.edu.az"
      },
      {
        id: "power-electronics",
        name: {
          az: "Güc elektronikası laboratoriyası",
          en: "Power Electronics Laboratory"
        },
        department: {
          az: "Elektrotexnika kafedrası",
          en: "Electrical Engineering Department"
        },
        description: {
          az: "Enerji çevrilməsi (düzləndiricilər, invertorlar) və mühərrik intiqallarının idarəetmə dövrələrinin öyrənilməsi.",
          en: "Study of energy conversion (rectifiers, inverters) and control circuits for motor drives."
        },
        educationalObjectives: {
          az: "Güc elektronikası elementlərinin iş prinsiplərini və sənaye tətbiqi imkanlarını öyrətmək.",
          en: "To teach the working principles of power electronics elements and their industrial applications."
        },
        contact: "IV bina, 3-cü mərtəbə, 311-ci otaq | Məsul şəxs: Nemətov Vasif | vasif.neymatov@aztu.edu.az"
      },
      {
        id: "electrical-machines",
        name: {
          az: "Elektrik maşınları laboratoriyası",
          en: "Electrical Machines Laboratory"
        },
        department: {
          az: "Elektrotexnika kafedrası",
          en: "Electrical Engineering Department"
        },
        description: {
          az: "Elektrik enerjisinin mexaniki enerjiyə və əksinə çevrilməsi prinsiplərinə, AC/DC maşın modellərinə fokuslanır.",
          en: "Focused on energy conversion principles, AC/DC machine models, and efficiency determination."
        },
        educationalObjectives: {
          az: "Müxtəlif növ elektrik maşınlarının xarakteristikalarını, iş rejimlərini və texnoloji tətbiqlərini tədqiq etmək.",
          en: "To investigate the characteristics, operating modes, and technological applications of various electrical machines."
        },
        contact: "IV bina, 3-cü mərtəbə, 313-cü otaq | Məsul şəxs: Məmmədov Əyyar | eyyar.memmedov@aztu.edu.az"
      },
      {
        id: "electrical-machines-and-electronics-combined",
        name: {
          az: "Elektrik maşınları və elektronika birləşdirilmiş laboratoriyası",
          en: "Electrical Machines and Electronics Laboratory"
        },
        department: {
          az: "Elektrotexnika kafedrası",
          en: "Electrical Engineering Department"
        },
        description: {
          az: "Enerji çevrilməsi proseslərinin elektron komponentlərlə (diod, tranzistor) birgə analizi üçün kompleks laboratoriya.",
          en: "A complex laboratory for the joint analysis of energy conversion processes with electronic components."
        },
        educationalObjectives: {
          az: "Mürəkkəb mühərrik sistemlərinin və elektron idarəetmə sxemlərinin inteqrasiyasını öyrətmək.",
          en: "To teach the integration of complex motor systems and electronic control circuits."
        },
        contact: "IV bina, 4-cü mərtəbə, 408-ci otaq | Məsul şəxs: İbrahimli Günel | gunel.ibrahimli@aztu.edu.az"
      }
    ]
  },
  {
    department: {
      az: "Mühəndislik İnkişaf Proqramı (MİP)",
      en: "Engineering Development Program (EDP)"
    },
    labs: [
      {
        id: "edp-2023-workshop",
        name: {
          az: "MİP-2023 Emalatxanası",
          en: "EDP-2023 Workshop"
        },
        department: {
          az: "Mühəndislik İnkişaf Proqramı (MİP)",
          en: "Engineering Development Program (EDP)"
        },
        description: {
          az: "Türkiyənin TAI şirkəti ilə əməkdaşlıq çərçivəsində yaradılmış, PUA inkişafı, CAD/CAM/CAE və 3D çap üzrə layihə əsaslı öyrənmə mühiti.",
          en: "Established with TAI (Turkey), focusing on UAV development, CAD/CAM/CAE, and 3D printing through project-based learning."
        },
        educationalObjectives: {
          az: "Tələbələrə müasir mühəndislik dizaynı, prototipləmə və PUA yığımı vərdişləri aşılamaq.",
          en: "To instill modern engineering design, prototyping, and UAV assembly skills in students."
        },
        contact: "I bina, 1-ci mərtəbə, 124-cü otaq | Məsul şəxs: Əliyeva Şərəfxanım | sharafxanim@aztu.edu.az"
      }
    ]
  },
  {
    department: {
      az: "Enerji səmərəliliyi və yaşıl enerji texnologiyaları kafedrası",
      en: "Energy Efficiency and Green Energy Technologies Department"
    },
    labs: [
      {
        id: "thermal-engineering",
        name: {
          az: "İstilik texnikası laboratoriyası",
          en: "Thermal Engineering Laboratory"
        },
        department: {
          az: "Enerji səmərəliliyi və yaşıl enerji texnologiyaları kafedrası",
          en: "Energy Efficiency and Green Energy Technologies Department"
        },
        description: {
          az: "Termodinamik proseslərin, istilik tutumunun və buxar təzyiqinin avtomatlaşdırılmış cihazlarla tədqiqi.",
          en: "Study of thermodynamic processes, heat capacity, and vapor pressure using automated devices."
        },
        educationalObjectives: {
          az: "İstilik proseslərinin fundamental qanunlarını eksperimental yolla öyrənmək və analiz vərdişləri formalaşdırmaq.",
          en: "To study fundamental laws of thermal processes experimentally and develop analysis skills."
        },
        contact: "V bina, 3-cü mərtəbə, 305-ci otaq | Məsul şəxs: Vaqif Həsənov | vagif.hasanov@aztu.edu.az"
      },
      {
        id: "research-thermal-physical-properties",
        name: {
          az: "Maddələrin istilik-fiziki xassələrinin tədqiqi laboratoriyası",
          en: "Research Laboratory of Thermal-Physical Properties of Substances"
        },
        department: {
          az: "Enerji səmərəliliyi və yaşıl enerji texnologiyaları kafedrası",
          en: "Energy Efficiency and Green Energy Technologies Department"
        },
        description: {
          az: "Karbohidrogenlərin, spirtlərin və qarışıqların sıxlığının və səs sürətinin yüksək dəqiqliklə (DSA 5000 M) öyrənilməsi.",
          en: "High-precision study of density and sound velocity of hydrocarbons, alcohols, and mixtures using DSA 5000 M."
        },
        educationalObjectives: {
          az: "Maddələrin termofiziki parametrlərinin ölçülməsi metodlarını mənimsəmək və sənaye üçün analitik nəticələr əldə etmək.",
          en: "To master measurement methods for thermophysical parameters and obtain analytical results for industry."
        },
        contact: "V bina, 3-cü mərtəbə, 308-ci otaq | Məsul şəxs: Vaqif Həsənov | vagif.hasanov@aztu.edu.az"
      },
      {
        id: "green-energy-technologies",
        name: {
          az: "Yaşıl enerji texnologiyaları laboratoriyası",
          en: "Green Energy Technologies Laboratory"
        },
        department: {
          az: "Enerji səmərəliliyi və yaşıl enerji texnologiyaları kafedrası",
          en: "Energy Efficiency and Green Energy Technologies Department"
        },
        description: {
          az: "Bərpa olunan mənbələrin, günəş panellərinin və istilik nasoslarının səmərəliliyinin tədqiqi.",
          en: "Research on renewable energy sources, solar panels, and heat pump efficiency."
        },
        educationalObjectives: {
          az: "Alternativ enerji texnologiyalarını öyrətmək və dayanıqlı enerji həlləri üzrə tədqiqatlar aparmaq.",
          en: "To teach alternative energy technologies and conduct research on sustainable energy solutions."
        },
        contact: "V bina, 3-cü mərtəbə, 312-ci otaq | Məsul şəxs: Vaqif Həsənov | vagif.hasanov@aztu.edu.az"
      },
      {
        id: "refrigeration-technology",
        name: {
          az: "Soyutma texnikası laboratoriyası",
          en: "Refrigeration Technology Laboratory"
        },
        department: {
          az: "Enerji səmərəliliyi və yaşıl enerji texnologiyaları kafedrası",
          en: "Energy Efficiency and Green Energy Technologies Department"
        },
        description: {
          az: "Aşağı temperaturlu sahələrdə istilik və kütlə mübadiləsinin, buxar-kompressor dövrlərinin tədqiqi.",
          en: "Study of heat and mass transfer in low-temperature fields and vapor-compression cycles."
        },
        educationalObjectives: {
          az: "Soyutma sistemlərinin iş prinsiplərini öyrənmək və diaqnostika vərdişləri formalaşdırmaq.",
          en: "To study the working principles of cooling systems and develop diagnostic skills."
        },
        contact: "V bina, 3-cü mərtəbə, 306-ci otaq | Məsul şəxs: Vaqif Həsənov | vagif.hasanov@aztu.edu.az"
      }
    ]
  },
  {
    department: {
      az: "Kimya texnologiyası, təkrar emal və ekologiya kafedrası",
      en: "Chemistry Technology, Recycling and Ecology Department"
    },
    labs: [
      {
        id: "organic-chemistry",
        name: {
          az: "Üzvi kimya laboratoriyası",
          en: "Organic Chemistry Laboratory"
        },
        department: {
          az: "Kimya texnologiyası, təkrar emal və ekologiya kafedrası",
          en: "Chemistry Technology, Recycling and Ecology Department"
        },
        description: {
          az: "Üzvi maddələrin sintezi və AA spektrometrləri, kalorimetrlər vasitəsilə tədqiqi.",
          en: "Synthesis and investigation of organic substances using AA spectrometers and calorimeters."
        },
        educationalObjectives: {
          az: "Üzvi sintez metodlarını tətbiq etmək və ekoloji texnologiyalar üzrə tədqiqatlar aparmaq.",
          en: "To apply organic synthesis methods and conduct research on ecological technologies."
        },
        contact: "IV bina, 1-ci mərtəbə, 118-ci otaq | Məsul şəxs: Vaqifə Hüseynova | huseynova@aztu.edu.az"
      },
      {
        id: "inorganic-chemistry",
        name: {
          az: "Qeyri-üzvi kimya laboratoriyası",
          en: "Inorganic Chemistry Laboratory"
        },
        department: {
          az: "Kimya texnologiyası, təkrar emal və ekologiya kafedrası",
          en: "Chemistry Technology, Recycling and Ecology Department"
        },
        description: {
          az: "Universitetin ən qədim laboratoriyalarından biri olub, qeyri-üzvi sintez və metal ion analizinə fokuslanır.",
          en: "One of the university's oldest facilities, focusing on inorganic synthesis and metal ion analysis."
        },
        educationalObjectives: {
          az: "Fundamental kimyəvi anlayışları praktiki dərslərlə öyrətmək və laboratoriya təhlükəsizliyi vərdişləri aşılamaq.",
          en: "To teach fundamental chemical concepts through practical sessions and instill laboratory safety skills."
        },
        contact: "IV bina, 1-ci mərtəbə, 117-ci otaq | Məsul şəxs: Yeganə Qəhrəmanova | yegana.gahramanova@aztu.edu.az"
      },
      {
        id: "physical-chemistry",
        name: {
          az: "Fiziki kimya laboratoriyası",
          en: "Physical Chemistry Laboratory"
        },
        department: {
          az: "Kimya texnologiyası, təkrar emal və ekologiya kafedrası",
          en: "Chemistry Technology, Recycling and Ecology Department"
        },
        description: {
          az: "Kimyəvi energetika, tarazlıq və reaksiya sürətlərinin öyrənilməsi üçün cihazlarla təchiz edilmişdir.",
          en: "Equipped for studying chemical energetics, equilibrium, and reaction rates."
        },
        educationalObjectives: {
          az: "Energetika və tarazlıq üzrə nəzəri bilikləri praktiki tətbiq etmək və tədqiqatlara hazırlamaq.",
          en: "To practically apply theoretical knowledge in energetics and equilibrium and prepare for research."
        },
        contact: "IV bina, 1-ci mərtəbə, 113-cü otaq | Məsul şəxs: Şükufə Eyvazova | eyvazova@aztu.edu.az"
      },
      {
        id: "analytical-chemistry",
        name: {
          az: "Analitik kimya laboratoriyası",
          en: "Analytical Chemistry Laboratory"
        },
        department: {
          az: "Kimya texnologiyası, təkrar emal və ekologiya kafedrası",
          en: "Chemistry Technology, Recycling and Ecology Department"
        },
        description: {
          az: "Su, torpaq və sənaye tullantılarının tərkibinin keyfiyyət və kəmiyyət analizi mərkəzi.",
          en: "Center for qualitative and quantitative analysis of water, soil, and industrial waste."
        },
        educationalObjectives: {
          az: "Müasir analitik metodları öyrətmək və ekoloji monitorinq bacarıqlarını inkişaf etdirmək.",
          en: "To teach modern analytical methods and develop environmental monitoring skills."
        },
        contact: "IV bina, 1-ci mərtəbə, 120-ci otaq | Məsul şəxs: Qumru Zaidova | qumru.zaidova@aztu.edu.az"
      },
      {
        id: "scientific-research-chemistry",
        name: {
          az: "Elmi-tədqiqat laboratoriyası",
          en: "Scientific Research Laboratory"
        },
        department: {
          az: "Kimya texnologiyası, təkrar emal və ekologiya kafedrası",
          en: "Chemistry Technology, Recycling and Ecology Department"
        },
        description: {
          az: "Kimya, fizika və materialşünaslıq üzrə fundamental tədqiqat və sənaye problemlərinin modelləşdirilməsi mərkəzi.",
          en: "Hub for fundamental research in chemistry, physics, and materials science, modeling industrial problems."
        },
        educationalObjectives: {
          az: "Yeni materialların hazırlanması, elmi metodologiya və hesabatlılıq vərdişlərinə yiyələnmək.",
          en: "To acquire skills in material preparation, scientific methodology, and reporting."
        },
        contact: "IV bina, 1-ci mərtəbə, 115-ci otaq | Məsul şəxs: Veysalova Nailə | naila.veysova@aztu.edu.az"
      }
    ]
  },
  {
    department: {
      az: "Kompüter texnologiyaları kafedrası",
      en: "Computer Technologies Department"
    },
    labs: [
      {
        id: "database-and-information-systems",
        name: {
          az: "Məlumat bazası və informasiya sistemləri laboratoriyası",
          en: "Database and Information Systems Laboratory"
        },
        department: {
          az: "Kompüter texnologiyaları kafedrası",
          en: "Computer Technologies Department"
        },
        description: {
          az: "SQL idarəetməsi, verilənlər bazası dizaynı və normallaşdırılmasının MySQL/PostgreSQL vasitəsilə tədrisi.",
          en: "Teaching SQL management, database design, and normalization using MySQL/PostgreSQL."
        },
        educationalObjectives: {
          az: "İnformasiya sistemlərinin yaradılması, təhlükəsizliyi və performans optimallaşdırılmasını öyrətmək.",
          en: "To teach information system creation, security, and performance optimization."
        },
        contact: "VI bina, 5-ci mərtəbə, 504-cü otaq | Məsul şəxs: Rəşadət Fəttahova | rashadat.fattahova@aztu.edu.az"
      },
      {
        id: "virtual-machines-and-multimedia",
        name: {
          az: "Virtual maşınlar və multimedia texnologiyaları laboratoriyası",
          en: "Virtual Machines and Multimedia Technologies Laboratory"
        },
        department: {
          az: "Kompüter texnologiyaları kafedrası",
          en: "Computer Technologies Department"
        },
        description: {
          az: "Virtual maşınların qurulması, ƏS testləri və multimedia (3D, animasiya, video) emalı mərkəzi.",
          en: "Center for VM setup, OS testing, and multimedia (3D, animation, video) processing."
        },
        educationalObjectives: {
          az: "Bulud texnologiyaları və multimedia tətbiqlərinin inkişafı üzrə peşəkar hazırlıq təmin etmək.",
          en: "To provide professional preparation in cloud technologies and multimedia application development."
        },
        contact: "VI bina, 5-ci mərtəbə, 507-ci otaq | Məsul şəxs: Rəşadət Fəttahova | rashadat.fattahova@aztu.edu.az"
      },
      {
        id: "computer-architecture-and-digital-systems",
        name: {
          az: "Kompüter arxitekturası və rəqəmsal sistemlər laboratoriyası",
          en: "Computer Architecture and Digital Systems Laboratory"
        },
        department: {
          az: "Kompüter texnologiyaları kafedrası",
          en: "Computer Technologies Department"
        },
        description: {
          az: "Kompüterin daxili strukturu, prosessorlar, FPGA və rəqəmsal məntiqin öyrənilməsi.",
          en: "Study of internal computer structure, processors, FPGA, and digital logic."
        },
        educationalObjectives: {
          az: "Aparat səviyyəsində rəqəmsal sistemlərin layihələndirilməsini və analitik düşüncəni gücləndirmək.",
          en: "To strengthen digital system design at the hardware level and analytical thinking."
        },
        contact: "VII bina, 5-ci mərtəbə, 512-ci otaq | Məsul şəxs: Rəşadət Fəttahova | rashadat.fattahova@aztu.edu.az"
      }
    ]
  },
  {
    department: {
      az: "Logistika və Nəqliyyat İnstitutu",
      en: "Logistics and Transport Institute"
    },
    labs: [
      {
        id: "ptv-laboratory",
        name: {
          az: "PTV laboratoriya: Şəhər nəqliyyat planlaması və mobillik laboratoriyası",
          en: "PTV Laboratory: Urban Transport Planning and Mobility Laboratory"
        },
        department: {
          az: "Logistika və Nəqliyyat İnstitutu",
          en: "Logistics and Transport Institute"
        },
        description: {
          az: "Şəhərlərin nəqliyyat planlaması, şəhələrdə ictimai nəqliyyatın fəaliyyətinin təşkili, mikromobilliyin təmin edilməsi, yol hərəkətinin təşkili üzrə fənlər üçün virtual laboratoriya.",
          en: "A virtual laboratory for urban transport planning, public transport organization, micro-mobility, and traffic management."
        },
        educationalObjectives: {
          az: "Yol hərəkətinin təşkili, mobilliyin yaxşılaşdırılması və simulyasiya testlərinin aparılması bacarıqlarını inkişaf etdirmək.",
          en: "To develop skills in traffic management, mobility improvement, and simulation testing."
        }
      },
      {
        id: "anylogic-laboratory",
        name: {
          az: "CRENG Service Office. Anylogic laboratoriyası",
          en: "CRENG Service Office – AnyLogic Laboratory"
        },
        department: {
          az: "Logistika və Nəqliyyat İnstitutu",
          en: "Logistics and Transport Institute"
        },
        description: {
          az: "Nəqliyyat və logistika əməliyyatlarının öyrənilməsi və optimallaşdırılması məqsədilə anbar, liman və yüklərin paylanması modelləşdirilməsi.",
          en: "Used for modeling warehouses, ports, and cargo distribution to optimize transport and logistics operations."
        },
        educationalObjectives: {
          az: "Təchizat zəncirinin qurulması, yük axınlarının optimallaşdırılması və müasir proqram vasitələrindən istifadəni öyrətmək.",
          en: "To teach supply chain design, cargo flow optimization, and the use of modern software tools."
        }
      }
    ]
  },
  {
    department: {
      az: "Maşın dizaynı, mexatronika və sənaye texnologiyaları kafedrası",
      en: "Machine Design, Mechatronics and Industrial Technologies Department"
    },
    labs: [
      {
        id: "cad-cae-laboratory",
        name: {
          az: "CAD/CAE laboratoriyası",
          en: "CAD/CAE Laboratory"
        },
        department: {
          az: "Maşın dizaynı, mexatronika və sənaye texnologiyaları kafedrası",
          en: "Machine Design, Mechatronics and Industrial Technologies Department"
        },
        description: {
          az: "Simulyasiya, 3D modelləşdirmə və konstruktor cizgilərinin hazırlanması üçün Solidworks və AutoCAD proqramları ilə təchiz edilmiş laboratoriya.",
          en: "Equipped with state-of-the-art computers for simulations, 3D modeling, and engineering drafting using Solidworks and AutoCAD."
        },
        educationalObjectives: {
          az: "CAD/CAE proqramları ilə işləmə, konstruktor cizgilərinin hazırlanması və innovativ dizayn bacarıqlarını inkişaf etdirmək.",
          en: "To develop skills in CAD/CAE software, preparation of engineering drawings, and innovative design."
        }
      },
      {
        id: "theory-of-machines-and-mechanisms",
        name: {
          az: "Maşın və mexanizmlər nəzəriyyəsi laboratoriyası",
          en: "Theory of Machines and Mechanisms Laboratory"
        },
        department: {
          az: "Maşın dizaynı, mexatronika və sənaye texnologiyaları kafedrası",
          en: "Machine Design, Mechatronics and Industrial Technologies Department"
        },
        description: {
          az: "Mexanizmlərin struktur və kinematik analizini öyrənmək üçün TMM model dəstləri və təlim stendləri.",
          en: "Equipped with TMM model kits and training stands for studying the structural and kinematic analysis of various mechanisms."
        },
        educationalObjectives: {
          az: "Mexanizmlərin struktur və kinematik xüsusiyyətlərini öyrətmək və kinematik analiz bacarıqlarını aşılamaq.",
          en: "To teach structural and kinematic characteristics and instill kinematic analysis skills."
        }
      },
      {
        id: "machine-design-lab",
        name: {
          az: "Maşın dizaynı laboratoriyası",
          en: "Machine Design Laboratory"
        },
        department: {
          az: "Maşın dizaynı, mexatronika və sənaye texnologiyaları kafedrası",
          en: "Machine Design, Mechatronics and Industrial Technologies Department"
        },
        description: {
          az: "Maşın elementlərinin quruluşunun, funksiyasının və iş prinsiplərinin təlim stendləri vasitəsilə öyrənilməsi.",
          en: "Designed for students to study the structure, function, and operating principles of machine elements using samples and training stands."
        },
        educationalObjectives: {
          az: "Maşın elementlərinin quruluşunu öyrətmək və mühəndislik düşüncəsini inkişaf etdirmək.",
          en: "To teach the structure of elements and develop engineering thinking."
        }
      },
      {
        id: "lifting-and-continuous-transport-machines",
        name: {
          az: "Yükqaldıran maşınlar və fasiləsiz nəqledici maşınlar laboratoriyası",
          en: "Lifting Machines and Continuous Transport Machines Laboratory"
        },
        department: {
          az: "Maşın dizaynı, mexatronika və sənaye texnologiyaları kafedrası",
          en: "Machine Design, Mechatronics and Industrial Technologies Department"
        },
        description: {
          az: "Yükqaldıran maşınların mexanizmlərinin və müxtəlif konveyer sistemlərinin quruluşu və iş prinsipləri.",
          en: "Equipped for studying hoisting machine components, crane installations, and various conveyor systems."
        },
        educationalObjectives: {
          az: "Yükqaldıran maşınların və konveyerlərin quruluşunu öyrətmək, mexaniki sistemlərin analizini həyata keçirmək.",
          en: "To teach the components of lifting machines and conveyors, and perform mechanical system analysis."
        }
      },
      {
        id: "process-automation-laboratory",
        name: {
          az: "Proseslərin avtomatlaşdırılması laboratoriyası",
          en: "Process Automation Laboratory"
        },
        department: {
          az: "Maşın dizaynı, mexatronika və sənaye texnologiyaları kafedrası",
          en: "Machine Design, Mechatronics and Industrial Technologies Department"
        },
        description: {
          az: "Müasir sənaye idarəetmə sistemlərinin (PLC, SCADA) tədqiqi və praktiki tətbiqi mühiti.",
          en: "A research environment for the instruction and application of modern industrial control systems (PLC, SCADA)."
        },
        educationalObjectives: {
          az: "Avtomatlaşdırma prinsiplərini öyrətmək, sənaye proseslərini modelləşdirmək və idarəetmə alqoritmləri hazırlamaq.",
          en: "To teach automation principles, model industrial processes, and develop control algorithms."
        }
      },
      {
        id: "robotics-and-mechatronics-laboratory",
        name: {
          az: "Robototexnika və mexatronika laboratoriyası",
          en: "Robotics and Mechatronics Laboratory"
        },
        department: {
          az: "Maşın dizaynı, mexatronika və sənaye texnologiyaları kafedrası",
          en: "Machine Design, Mechatronics and Industrial Technologies Department"
        },
        description: {
          az: "Robototexnika, mexatronik sistemlərin inteqrasiyası və avtomatlaşdırılmış mexaniki qurğuların idarə olunması.",
          en: "Established to provide practical and theoretical knowledge in robotics, mechatronic systems integration, and control of automated devices."
        },
        educationalObjectives: {
          az: "Robot manipulyatorlarının idarə edilməsi və sensor-aktuator inteqrasiyasını öyrətmək.",
          en: "To teach robot manipulator control and sensor/actuator integration."
        }
      },
      {
        id: "food-engineering-laboratory",
        name: {
          az: "Qida mühəndisliyi laboratoriyası",
          en: "Food Engineering Laboratory"
        },
        department: {
          az: "Maşın dizaynı, mexatronika və sənaye texnologiyaları kafedrası",
          en: "Machine Design, Mechatronics and Industrial Technologies Department"
        },
        description: {
          az: "Qida sənayesində texnoloji əməliyyatlar, mikrobiologiya və qida istehsalı avadanlıqlarının tədqiqi.",
          en: "Established for laboratory sessions in food technology, microbiology, and food production equipment."
        },
        educationalObjectives: {
          az: "Qida emalı proseslərinin nümayişi, avadanlıqların iş prinsipləri və qida analizi bacarıqlarını inkişaf etdirmək.",
          en: "To demonstrate food processing, teach equipment principles, and develop food analysis skills."
        }
      }
    ]
  },
  {
    department: {
      az: "Maşınqayırma texnologiyası kafedrası",
      en: "Machine-Building Technologies Department"
    },
    labs: [
      {
        id: "virtual-project-technological-educational-center",
        name: {
          az: "Virtual Layihə Texnoloji-Tədris Mərkəzi",
          en: "Virtual Project Technological-Educational Center"
        },
        department: {
          az: "Maşınqayırma texnologiyası kafedrası",
          en: "Machine-Building Technologies Department"
        },
        description: {
          az: "Texnoloji proseslərin avtomatlaşdırılmış layihələndirilməsi və rəqəmsal modelləşdirmə imkanları.",
          en: "Equipped for teaching Computer-Aided Design of Technological Processes and digital modeling."
        },
        educationalObjectives: {
          az: "CAD platformaları ilə işləmə və istehsal proseslərinin rəqəmsal modelləşdirilməsi vərdişlərinə yiyələnmək.",
          en: "To master CAD platforms and digital modeling of production processes."
        }
      },
      {
        id: "digital-design-and-technology-laboratory",
        name: {
          az: "Rəqəmsal Dizayn və Texnologiya Laboratoriyası (RDTL)",
          en: "Digital Design & Technology Laboratory (DDTL)"
        },
        department: {
          az: "Maşınqayırma texnologiyası kafedrası",
          en: "Machine-Building Technologies Department"
        },
        description: {
          az: "Simulyasiya, 3D modelləşdirmə və mürəkkəb mühəndislik tapşırıqları üçün yüksək performanslı mühit.",
          en: "High-level computer systems for simulation, 3D modeling, and complex engineering tasks."
        },
        educationalObjectives: {
          az: "CAD/CAE proqramlarından istifadə, konstruktor cizgilərinin hazırlanması və problem həll etmə bacarıqlarını artırmaq.",
          en: "To enhance skills in CAD/CAE software, engineering drawing, and problem-solving."
        }
      },
      {
        id: "machine-building-technology-teaching-laboratory",
        name: {
          az: "Maşınqayırma Texnologiyası Tədris Laboratoriyası",
          en: "Machine-Building Technology Teaching Laboratory"
        },
        department: {
          az: "Maşınqayırma texnologiyası kafedrası",
          en: "Machine-Building Technologies Department"
        },
        description: {
          az: "Mexaniki emal, kəsici alətlərlə iş və istehsal səmərəliliyinin artırılması üzrə praktiki dərslər.",
          en: "Serves educational processes in machining, cutting tools, and production efficiency."
        },
        educationalObjectives: {
          az: "Mexaniki emal proseslərinin optimallaşdırılması və texnoloji ardıcıllıqların hazırlanmasını öyrətmək.",
          en: "To teach machining optimization and the preparation of technological sequences."
        }
      },
      {
        id: "hexagon-coordinate-metrology-laboratory",
        name: {
          az: "“HEXAGON” Koordinat Metrologiya Laboratoriyası",
          en: "“HEXAGON” Coordinate Metrology Laboratory"
        },
        department: {
          az: "Maşınqayırma texnologiyası kafedrası",
          en: "Machine-Building Technologies Department"
        },
        description: {
          az: "Yüksək dəqiqlikli HEXAGON CMM və 3D skanerlərlə təchiz edilmiş metrologiya və standartlaşdırma mühiti.",
          en: "Equipped with high-precision HEXAGON CMM and 3D scanners for Metrology and Standardization courses."
        },
        educationalObjectives: {
          az: "Koordinat ölçmə texnologiyalarının tətbiqi, 3D skan və ölçmə nəticələrinin təhlilini öyrətmək.",
          en: "To teach the application of coordinate measuring technologies, 3D scanning, and data analysis."
        }
      },
      {
        id: "interchangeability-laboratory",
        name: {
          az: "Qarşılıqlı əvəzolunma laboratoriyası",
          en: "Interchangeability Laboratory"
        },
        department: {
          az: "Maşınqayırma texnologiyası kafedrası",
          en: "Machine-Building Technologies Department"
        },
        description: {
          az: "Ölçmə sistemlərinin qurulması, keyfiyyətə nəzarət və istehsal proseslərinin simulyasiyası.",
          en: "Equipped with modern measuring instruments for simulation of production processes and quality control."
        },
        educationalObjectives: {
          az: "Metrologiya və cihazqayırma fənlərinin tədrisi, ölçmə sistemlərinin qurulması bacarıqlarını aşılamaq.",
          en: "To teach metrology and instrumentation, and instill skills in establishing measurement systems."
        }
      }
    ]
  },
  {
    department: {
      az: "Metallurgiya və materiallar texnologiyası kafedrası",
      en: "Metallurgy and Materials Technology Department"
    },
    labs: [
      {
        id: "metallography-laboratory",
        name: {
          az: "Metalloqrafiya laboratoriyası",
          en: "Metallography Laboratory"
        },
        department: {
          az: "Metallurgiya və materiallar texnologiyası kafedrası",
          en: "Metallurgy and Materials Technology Department"
        },
        description: {
          az: "Metal və ərintilərin mikrostruktur tədqiqi, atom qüvvə mikroskopiyası və nümunələrin hazırlanması.",
          en: "Equipped for microstructural investigation of metals, sample preparation, and nanoscale surface study."
        },
        educationalObjectives: {
          az: "Daxili quruluşun təhlili, mikrostrukturun interpretasiyası və mikrobərkliyin təyinini öyrətmək.",
          en: "To teach internal structure analysis, microstructure interpretation, and microhardness determination."
        }
      },
      {
        id: "mechanical-testing-laboratory",
        name: {
          az: "Mexaniki sınaq laboratoriyası",
          en: "Mechanical Testing Laboratory"
        },
        department: {
          az: "Metallurgiya və materiallar texnologiyası kafedrası",
          en: "Metallurgy and Materials Technology Department"
        },
        description: {
          az: "Dartıcı sınaq maşınları vasitəsilə materialların mexaniki xassələrinin (möhkəmlik, axıcılıq) təyini.",
          en: "Specialized area for determining mechanical properties using tensile testing machines to analyze stress-strain diagrams."
        },
        educationalObjectives: {
          az: "Mexaniki xassələrin təyini bacarıqlarını inkişaf etdirmək və mühəndislik xarakteristikalarını qiymətləndirmək.",
          en: "To develop skills in determining mechanical properties and evaluating engineering characteristics."
        }
      },
      {
        id: "casting-and-welding-laboratory",
        name: {
          az: "Tökmə və qaynaq laboratoriyası",
          en: "Casting and Welding Laboratory"
        },
        department: {
          az: "Metallurgiya və materiallar texnologiyası kafedrası",
          en: "Metallurgy and Materials Technology Department"
        },
        description: {
          az: "İnduksiya sobaları və qaynaq avadanlıqları ilə metaləritmə, kristallaşma və birləşmələrin tədqiqi.",
          en: "Specialized for research on melting, solidification, and welding of metals using induction furnaces and welding equipment."
        },
        educationalObjectives: {
          az: "Tökmə və qaynaq prinsiplərini öyrətmək, struktur dəyişiklikləri və qüsurları tədqiq etmək.",
          en: "To teach casting and welding principles, and investigate structural changes and defects."
        }
      }
    ]
  },
  {
    department: {
      az: "Mexanika kafedrası",
      en: "Mechanics Department"
    },
    labs: [
      {
        id: "hydromechanics-and-strength-of-materials",
        name: {
          az: "Hidromexanika və Materiallar müqaviməti laboratoriyası",
          en: "Hydromechanics and Strength of Materials Laboratory"
        },
        department: {
          az: "Mexanika kafedrası",
          en: "Mechanics Department"
        },
        description: {
          az: "Materiallar müqaviməti, hidromexanika və hidravlika üzrə laboratoriya işlərinin icrası mühiti.",
          en: "Operates teaching and research for mechanical engineering in subjects like hydraulics and strength of materials."
        },
        educationalObjectives: {
          az: "Mexaniki və hidravlik proseslərin öyrənilməsi, nəzəri biliklərin praktiki icra ilə möhkəmləndirilməsi.",
          en: "To study mechanical and hydraulic processes and reinforce theoretical knowledge through practical implementation."
        }
      },
      {
        id: "fluid-flow-in-pipelines",
        name: {
          az: "Boru kəmərlərində maye axınlarının tədqiqi laboratoriyası",
          en: "Laboratory for the Study of Fluid Flow in Pipelines"
        },
        department: {
          az: "Mexanika kafedrası",
          en: "Mechanics Department"
        },
        description: {
          az: "Boru kəmərlərindən mayelərin axınını öyrənməyə və hidravlik parametrləri tədqiq etməyə imkan verən mühit.",
          en: "Established to study fluid flow in pipeline systems and support research in fluid mechanics."
        },
        educationalObjectives: {
          az: "Maye axınlarının qanunauyğunluqları, hidravlik parametrlərin ölçülməsi və modelləşdirilməsini öyrətmək.",
          en: "To teach laws of fluid flow, measurement of hydraulic parameters, and flow modeling."
        }
      }
    ]
  }
];
