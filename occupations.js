var data=[];
var test = [];
var firstolumnContent = 0
var secondColumnContent = 0
var seventhColumnContent = 0
var sixColumnContent = 0
var jobIsEligible = 0
var globalScore = 0
var isAShortageOccupation = 0

var interMediate=false;

var isCountryEnglishSpeaker=false;

var scoresGlobal = {
    pointsApprouvedSponsor: 0,
    pointsApropriateSkillLevel: 0,
    pointsEnglishLevel: 0,
    pointsSalary: 0,
    pointsShortageOccupation: 0,
    pointsEducationQualification: 0,
};
 // A function that calculates points to determine user eligibility.
// This function scans the form and adjusts the points based on user answers
function calculationFunction() {
    globalScore = 0
    var MANDATORY_THRESHOLD = 50;
    var SUM_THRESHOLD = 70;
    var mandatoryPoints = 0;
    var tradeablePoints = 0;
    var lessMininum = false;
    var incompleteForm=false;

     scoresGlobal = {
        pointsApprouvedSponsor: 0,
        pointsApropriateSkillLevel: 0,
        pointsEnglishLevel: 0,
        pointsSalary: 0,
        pointsShortageOccupation: 0,
        pointsEducationQualification: 0,
    };

    var criteriaToPropertyMap = {
        'Speaks English at required level': 'pointsEnglishLevel',
        'Do you have a job offer': 'pointsApprouvedSponsor',
        'Job at appropriate skill level': 'pointsApropriateSkillLevel',
        'Salary requirements': 'pointsSalary',
        'Job in a shortage occupation': 'pointsShortageOccupation',
        'Education qualification': 'pointsEducationQualification'
    };
    var rows = document.getElementById("tableResult").getElementsByTagName("tbody")[0].getElementsByTagName("tr");


    //ENglish level
    var countrySelect = document.getElementById("country");
    var selectedValue = countrySelect.value.toString();

    var trueCountrySelect = document.getElementById("selectElement");
    if ((selectedValue !== "A2" && selectedValue !== "A1" && selectedValue !== "choose") || isCountryEnglishSpeaker == true || interMediate == true) {
        globalScore = 10;
        mandatoryPoints = 10;
        scoresGlobal.pointsEnglishLevel = 10;
    }

    if(selectedValue == "choose" && trueCountrySelect.value.toString() == "none"){
        incompleteForm = true;
    }
   
    //Job offer 
    var jobOffer = document.getElementById("jobOffer");
    if(jobOffer.options[jobOffer.selectedIndex].index==0){ incompleteForm=true}
       
    globalScore = globalScore + parseInt(jobOffer.value)
    mandatoryPoints = mandatoryPoints + parseInt(jobOffer.value)
    scoresGlobal.pointsApprouvedSponsor = parseInt(jobOffer.value);
    
   
    //Skill level
    if(jobIsEligible){
        scoresGlobal.pointsApropriateSkillLevel = 20;
        mandatoryPoints = mandatoryPoints + 20;
    }
    //Shortage occupaton
    if(isAShortageOccupation){
        scoresGlobal.pointsShortageOccupation = 20;
        tradeablePoints =  tradeablePoints + 20;
    }

    //Salary
    var avgSalary = parseInt(seventhColumnContent.toString().slice(1));
    var realSalary = document.getElementById("exampleInputSalary");
    var realSalary = parseInt(realSalary.value.split(" ").join(""));
    if (realSalary === 0 || realSalary === '') {incompleteForm=true;}
	
	console.log("Going rate: " + avgSalary + "; Salary input: " + realSalary);


    if (realSalary >= Math.max(25600, avgSalary)) {
        globalScore = globalScore + 20
        tradeablePoints = tradeablePoints + 20
        scoresGlobal.pointsSalary = 20;

    } else if (realSalary >= Math.max(23040, 0.9 * avgSalary)) {
        globalScore = globalScore + 10
        tradeablePoints = tradeablePoints + 10
        scoresGlobal.pointsSalary = 10;
    }
    else if (realSalary < Math.max(20480, 0.8 * avgSalary)) {
        lessMininum = true
    }
    //Phd
    var selectedRadio = document.querySelector('input[name="phDQuestion"]:checked');
    if (selectedRadio) {
        var selectedValuePhd = parseInt(selectedRadio.value);
        globalScore = globalScore + selectedValuePhd
        tradeablePoints = tradeablePoints + selectedValuePhd
        if(selectedValuePhd!=0){
            scoresGlobal.pointsEducationQualification = selectedValuePhd
        }
    }else{
        incompleteForm=true
    }
    var pointCells = document.querySelectorAll("#tableResult tbody td:nth-child(3)");
    var tablePointsCorrespondance = ['10','20','20','20','20','20']
    
    var n = 0;
    var i = 0;
    var pointCells = document.querySelectorAll("#tableResult tbody td:nth-child(3)");
    pointCells.forEach(function(cell) {
        var criteria = cell.parentNode.querySelector("td:first-child").textContent.trim();
        var propertyName = criteriaToPropertyMap[criteria];

        if (propertyName) {
            var points = scoresGlobal[propertyName];

            cell.innerHTML = `<strong>${points}/${tablePointsCorrespondance[n]}</strong>`;
            if (points !== 0) {
                
                rows[n].style.backgroundColor = "#c3e6cb";
            }else{
                rows[n].style.backgroundColor = "#f8d7da";
            }
            n = n + 1
        }
    });
    var totalPoints = mandatoryPoints + tradeablePoints;
    if (incompleteForm) {
        i = 1
    } else if (mandatoryPoints >= MANDATORY_THRESHOLD && totalPoints < SUM_THRESHOLD) {
        i = 0
    } else if (mandatoryPoints >= MANDATORY_THRESHOLD && totalPoints >= SUM_THRESHOLD) {
        i = 2
    }
    if(lessMininum){
        i = 3;
    }
    var score = " The score is " + totalPoints + " mandatoryPoints : " + mandatoryPoints + " tradebale point " + tradeablePoints
    //Variable containing the result of the form 
    var resultForm = [{
            mainResult: "Unfortunately",
            explicationResult: " You do not fulfill all mandatory requirements for the “Skilled Worker” visa route.",
            class: "alert-danger"
        },
        {
            mainResult: "Incomplete",
            explicationResult: "Please complete all inputs to see if you reach the requirements. ",
            class: "alert-warning"
        },
        {
            mainResult: "Congratulations !",
            explicationResult: "Based on your input, you should qualify for a “Skilled Worker” visa!",
            class: "alert-success"
        },
        {
            mainResult: "Salary is under 80%",
            explicationResult: "Salary is under 80% of the going rate for the profession or less than &pound;20,480",
            class: "alert-warning"
        }
    ]    
    try {
           //Displaying form results
            const divElementTotalPoints = document.getElementById("totalPoints");
            divElementTotalPoints.innerHTML = "<strong>"+totalPoints+"</strong>"; 
            const divElement = document.getElementById("finalResult");
            divElement.classList.remove("alert-danger", "alert-warning", "alert-success");
            divElement.classList.add(resultForm[i].class);

            document.getElementById("resultMain").textContent = resultForm[i].mainResult;
            document.getElementById("explicationResult").textContent = resultForm[i].explicationResult;
      } catch (error) {
        console.error('An error was apprear',error.toString());
      }
}
/**
 * Retrieves a value from an array of data based on an ID.
 * @param {string} id - The ID to search for in the array.
 * @param {Array<Array>} array - The data array to search within.
 * @param {number} index - The index of the value to retrieve within the inner array.
 * @returns {any} The value corresponding to the given ID and index, or "Error" if not found.
 */
function getDataFromArray(id, array,indice) {
  const item = array.find(item => item[0] === id);
  return item ? item[indice] : "Error";
}
// Array wich contains all jobs. with this structure : 
// Code	Type	Related	Eligible	Shortage	Shortage description	Going_rate
var data = [[1115,"Chief executives and senior officials","Chief executive;Chief medical officer;Civil servant (grade 5 and above);Vice president",1,0,"","59300"],
[1116,"Elected officers and representatives","",0,0,"","0"],
[1121,"Production managers and directors in manufacturing","Engineering manager;Managing director (engineering);Operations manager (manufacturing);Production manager",1,0,"","35000"],
[1122,"Production managers and directors in construction","Building Services manager;Construction manager;Director (building construction);Owner (electrical contracting)",1,0,"","35700"],
[1123,"Production managers and directors in mining and energy","Operations manager (mining, water & energy);Quarry manager",1,0,"","38300"],
[1131,"Financial managers and directors","Investment banker;Treasury manager",1,0,"","42800"],
[1132,"Marketing and sales directors","Marketing director;Sales director",1,0,"","50000"],
[1133,"Purchasing managers and directors","Bid manager;Purchasing manager",1,0,"","35400"],
[1134,"Advertising and public relations directors","Account director (advertising);Head of public relations",1,0,"","51300"],
[1135,"Human resource managers and directors","Human resources manager;Personnel manager;Recruitment manager",1,0,"","36500"],
[1136,"Information technology and telecommunications directors","IT Director;Technical director (computer services);Telecommunications director",1,0,"","47900"],
[1139,"Functional managers and directors n.e.c.","Manager (charitable organisation);Research director",1,0,"","36900"],
[1150,"Financial institution managers and directors","Bank manager;Insurance manager",1,0,"","33900"],
[1161,"Managers and directors in transport and distribution","Fleet manager;Transport manager",1,0,"","30500"],
[1162,"Managers and directors in storage and warehousing","Logistics manager;Warehouse manager",1,0,"","25100"],
[1171,"Officers in armed forces","",0,0,"","0"],
[1172,"Senior police officers","Chief superintendent (police service);Detective inspector;Police inspector",1,0,"","55400"],
[1173,"Senior officers in fire, ambulance, prison and related services","Fire service officer (government);Prison governor;Station officer (ambulance service)",1,0,"","36400"],
[1181,"Health services and public health managers and directors","Director of nursing;Health Service manager;Information manager (health authority: hospital service)",1,1,"England, Scotland, Wales, Northern Ireland","41300"],
[1184,"Social services managers and directors","Care manager (local government: social services);Service manager (welfare services)",1,0,"","31500"],
[1190,"Managers and directors in retail and wholesale","Managing director (retail trade);Retail manager;Shop manager (charitable organisation);Wholesale manager",1,0,"","22400"],
[1211,"Managers and proprietors in agriculture and horticulture","Farm manager;Farm owner;Nursery manager (horticulture)",1,0,"","28000"],
[1213,"Managers and proprietors in forestry, fishing and related services","Cattery owner;Forest manager;Racehorse trainer",1,0,"","24100"],
[1221,"Hotel and accommodation managers and proprietors","Caravan park owner;Hotel manager;Landlady (boarding, guest, lodging house)",1,0,"","21800"],
[1223,"Restaurant and catering establishment managers and proprietors","Café owner;Fish & chip shopkeeper;Operations manager (catering);Restaurant manager;Shop manager (take-away food shop)",1,0,"","19600"],
[1224,"Publicans and managers of licensed premises","Landlady (public house);Licensee;Manager (wine bar);Publican",1,0,"","21800"],
[1225,"Leisure and sports managers","Amusement arcade owner;Leisure centre manager;Social club manager;Theatre manager",1,0,"","22300"],
[1226,"Travel agency managers and proprietors","Tourist information manager;Travel agency owner;Travel manager",1,0,"","20200"],
[1241,"Health care practice managers","Clinic manager;GP practice manager;Veterinary practice manager",1,0,"","28700"],
[1242,"Residential, day and domiciliary care managers and proprietors","Care manager;Day centre manager;Nursing home owner;Residential manager (residential home)",1,1,"England, Scotland, Wales, Northern Ireland","28300"],
[1251,"Property, housing and estate managers","Estate manager;Facilities manager;Landlord (property management);Property manager",1,0,"","28400"],
[1252,"Garage managers and proprietors","Garage director;Garage owner;Manager (repairing: motor vehicles)",1,0,"","26900"],
[1253,"Hairdressing and beauty salon managers and proprietors","Hairdressing salon owner;Health and fitness manager;Manager (beauty salon)",1,0,"","20600"],
[1254,"Shopkeepers and proprietors – wholesale and retail","Antiques dealer;Fashion retailer;Newsagent;Shopkeeper",1,0,"","26000"],
[1255,"Waste disposal and environmental services managers","Environmental manager (refuse disposal);Manager (local government: cleansing dept.);Recycling plant manager;Scrap metal dealer",1,0,"","30700"],
[1259,"Managers and proprietors in other services n.e.c.","Betting shop manager;Graphic design classified manager;Library manager;Plant hire manager;Production manager (entertainment)",1,0,"","23000"],
[2111,"Chemical scientists","Analytical chemist;Chemist;Development chemist;Industrial chemist;Research chemist",1,1,"Scotland only","28500"],
[2112,"Biological scientists and biochemists","Biomedical scientist;Forensic scientist;Horticulturist;Microbiologist;Pathologist",1,1,"England, Scotland, Wales, Northern Ireland","30600"],
[2113,"Physical scientists","Geologist;Geophysicist;Medical physicist;Meteorologist;Oceanographer;Physicist;Seismologist",1,1,"England, Scotland, Wales, Northern Ireland","32600"],
[2114,"Social and humanities scientists","Anthropologist;Archaeologist;Criminologist;Epidemiologist;Geographer;Historian;Political scientist;Social scientist",1,1,"England, Scotland, Wales, Northern Ireland","25600"],
[2119,"Natural and social science professionals n.e.c.","Operational research scientist;Research associate (medical);Research fellow;Researcher;Scientific officer;Scientist;Sports scientist;University researcher",1,0,"","34600"],
[2121,"Civil engineers","Building engineer;Civil engineer (professional);Highways engineer;Petroleum engineer;Public health engineer;Site engineer;Structural engineer",1,1,"England, Scotland, Wales, Northern Ireland","34700"],
[2122,"Mechanical engineers","Aeronautical engineer (professional);Aerospace engineer;Automotive engineer (professional);Marine engineer (professional);Mechanical engineer (professional)",1,1,"England, Scotland, Wales, Northern Ireland","33000"],
[2123,"Electrical engineers","Electrical engineer (professional);Electrical surveyor;Equipment engineer;Power engineer;Signal engineer (railways)",1,1,"England, Scotland, Wales, Northern Ireland","39300"],
[2124,"Electronics engineers","Avionics engineer;Broadcasting engineer (professional);Electronics engineer (professional);Microwave engineer;Telecommunications engineer (professional)",1,1,"England, Scotland, Wales, Northern Ireland","33900"],
[2126,"Design and development engineers","Clinical engineer;Design engineer;Development engineer;Ergonomist;Research and development engineer",1,1,"England, Scotland, Wales, Northern Ireland","34100"],
[2127,"Production and process engineers","Chemical engineer;Industrial engineer;Process engineer;Production consultant;Production engineer",1,1,"England, Scotland, Wales, Northern Ireland","32000"],
[2129,"Engineering professionals n.e.c.","Acoustician (professional);Ceramicist;Food technologist;Metallurgist;Patent agent;Project engineer;Scientific consultant;Technical engineer;Technologist;Traffic engineer",1,1,"England, Scotland, Wales, Northern Ireland","33400"],
[2133,"IT specialist managers","Data centre manager;IT manager;IT support manager;Network operations manager (computer services);Service delivery manager",1,0,"","37900"],
[2134,"IT project and programme managers","Implementation manager (computing);IT project manager;Programme manager (computing);Project leader (software design)",1,0,"","39100"],
[2135,"IT business analysts, architects and systems designers","Business analyst (computing);Data communications analyst;Systems analyst;Systems consultant;Technical analyst (computing);Technical architect",1,1,"England, Scotland, Wales, Northern Ireland","37600"],
[2136,"Programmers and software development professionals","Analyst-programmer;Database developer;Games programmer;Programmer;Software engineer",1,1,"England, Scotland, Wales, Northern Ireland","34000"],
[2137,"Web design and development professionals","Internet developer;Multimedia developer;Web design consultant;Web designer",1,1,"England, Scotland, Wales, Northern Ireland","26800"],
[2139,"Information technology and telecommunications professionals n.e.c.","IT consultant;Quality analyst (computing);Software tester;Systems tester (computing);Telecommunications planner",1,1,"England, Scotland, Wales, Northern Ireland","32100"],
[2141,"Conservation professionals","Conservation officer;Ecologist;Energy conservation officer;Heritage manager;Marine conservationist",1,0,"","24900"],
[2142,"Environment professionals","Energy manager;Environmental consultant;Environmental engineer;Environmental protection officer;Environmental scientist;Landfill engineer",1,0,"","26800"],
[2150,"Research and development managers","Creative manager (research and development);Design manager;Market research manager;Research manager (broadcasting)",1,0,"","38100"],
[2211,"Medical practitioners","",0,0,"","0"],
[2212,"Psychologists","",0,0,"","0"],
[2213,"Pharmacists","",0,0,"","0"],
[2214,"Ophthalmic opticians","",0,0,"","0"],
[2215,"Dental practitioners","",0,0,"","0"],
[2216,"Veterinarians","Veterinarian;Veterinary practitioner;Veterinary surgeon",1,1,"England, Scotland, Wales, Northern Ireland","33700"],
[2217,"Medical radiographers","",0,0,"","0"],
[2218,"Podiatrists","",0,0,"","0"],
[2219,"Health professionals n.e.c.","",0,0,"","0"],
[2221,"Physiotherapists","",0,0,"","0"],
[2222,"Occupational therapists","",0,0,"","0"],
[2223,"Speech and language therapists","",0,0,"","0"],
[2229,"Therapy professionals n.e.c.","",0,0,"","0"],
[2231,"Nurses","",0,0,"","0"],
[2232,"Midwives","",0,0,"","0"],
[2311,"Higher education teaching professionals","Fellow (university);Lecturer (higher education, university);Professor (higher education, university);Tutor (higher education, university);University lecturer",1,0,"","41200"],
[2312,"Further education teaching professionals","",0,0,"","0"],
[2314,"Secondary education teaching professionals","",0,0,"","0"],
[2315,"Primary and nursery education teaching professionals","",0,0,"","0"],
[2316,"Special needs education teaching professionals","",0,0,"","0"],
[2317,"Senior professionals of educational establishments","Administrator (higher education, university);Bursar;Head teacher (primary school);Principal (further education);Registrar (educational establishments)",1,0,"","45400"],
[2318,"Education advisers and school inspectors","Curriculum adviser;Education adviser;Education officer;School inspector",1,0,"","29600"],
[2319,"Teaching and other educational professionals n.e.c.","Adult education tutor;Education consultant;Music teacher;Nursery manager (day nursery);Owner (nursery: children’s);Private tutor;TEFL",1,0,"","22400"],
[2412,"Barristers and judges","Advocate;Barrister;Chairman (appeals tribunal, inquiry);Coroner;Crown prosecutor;District judge",1,0,"","31200"],
[2413,"Solicitors","Managing clerk (qualified solicitor);Solicitor;Solicitor-partner;Solicitor to the council",1,0,"","33700"],
[2419,"Legal professionals n.e.c.","Attorney;Justice’s clerk;Lawyer;Legal adviser;Legal consultant;Legal counsel;Solicitor’s clerk (articled)",1,0,"","52100"],
[2421,"Chartered and certified accountants","Accountant (qualified);Auditor (qualified);Chartered accountant;Company accountant;Cost accountant (qualified);Financial controller (qualified);Management accountant (qualified)",1,0,"","31300"],
[2423,"Management consultants and business analysts","Business adviser;Business consultant;Business continuity manager;Financial risk analyst;Management consultant",1,0,"","32000"],
[2424,"Business and financial project management professionals","Chief knowledge officer;Contracts manager (security services);Project manager;Research support officer",1,0,"","39100"],
[2425,"Actuaries, economists and statisticians","Actuarial consultant;Actuary;Economist;Statistician;Statistical analyst",1,1,"England, Scotland, Wales, Northern Ireland","33600"],
[2426,"Business and related research professionals","Crime analyst (police force);Fellow (research);Games researcher (broadcasting);Inventor",1,0,"","31100"],
[2429,"Business, research and administrative professionals n.e.c.","Civil servant (grade 6, 7);Company secretary (qualified);Policy adviser (government);Registrar (government)",1,0,"","37500"],
[2431,"Architects","Architect;Architectural consultant;Chartered architect;Landscape architect",1,1,"England, Scotland, Wales, Northern Ireland","32900"],
[2432,"Town planning officers","Planning officer (local government: building and contracting);Town planner;Town planning consultant",1,0,"","27700"],
[2433,"Quantity surveyors","Quantity surveyor;Surveyor (quantity surveying)",1,0,"","31100"],
[2434,"Chartered surveyors","Building surveyor;Chartered surveyor;Hydrographic surveyor;Land surveyor",1,0,"","31400"],
[2435,"Chartered architectural technologists","Architectural technologist",1,0,"","30600"],
[2436,"Construction project managers and related professionals","Contract manager (building construction);Project manager (building construction);Transport planner",1,0,"","29500"],
[2442,"Social workers","",0,0,"","0"],
[2443,"Probation officers","Inspector (National Probation Service);Probation officer;Youth justice officer",1,0,"","33100"],
[2444,"Clergy","",0,0,"","0"],
[2449,"Welfare professionals n.e.c.","Children’s guardian;Rehabilitation officer;Social services officer;Youth worker (professional)",1,0,"","26400"],
[2451,"Librarians","Chartered librarian;Librarian;Technical librarian;University librarian",1,0,"","22200"],
[2452,"Archivists and curators","Archivist;Conservator;Curator;Keeper (art gallery);Museum officer",1,0,"","24500"],
[2461,"Quality control and planning engineers","Planning engineer;Quality assurance engineer;Quality control officer (professional);Quality engineer",1,1,"England, Scotland, Wales, Northern Ireland","31600"],
[2462,"Quality assurance and regulatory professionals","Compliance manager;Financial regulator;Patent attorney;Quality assurance manager;Quality manager",1,0,"","33300"],
[2463,"Environmental health professionals","Air pollution inspector;Environmental health officer;Food inspector;Public health inspector;Technical officer (environmental health)",1,0,"","34300"],
[2471,"Journalists, newspaper and periodical editors","Broadcast journalist;Editor;Journalist;Radio journalist;Reporter",1,0,"","26600"],
[2472,"Public relations professionals","Account manager (public relations);Information officer (public relations);PR consultant;Press officer;Public relations officer",1,0,"","26300"],
[2473,"Advertising accounts managers and creative directors","Account manager (advertising);Advertising Manager;Campaign Manager;Creative Director;Projects Manager (advertising)",1,0,"","31500"],
[3111,"Laboratory technicians","Laboratory analyst;Laboratory technician;Medical laboratory assistant;Scientific technician;Water tester",1,1,"England, Scotland, Wales, Northern Ireland","18900"],
[3112,"Electrical and electronics technicians","Avionics technician;Electrical technician;Electronics technician;Installation engineer (Electricity Supplier)",1,0,"","27800"],
[3113,"Engineering technicians","Aircraft technician;Commissioning engineer;Engineering technician;Manufacturing engineer;Mechanical technician",1,0,"","29900"],
[3114,"Building and civil engineering technicians","Building services consultant;Civil engineering technician;Survey technician;Technical assistant (civil engineering)",1,0,"","23000"],
[3115,"Quality assurance technicians","Quality assurance technician;Quality control technician;Quality officer;Quality technician;Test technician",1,0,"","24100"],
[3116,"Planning, process and production technicians","Process technician;Production controller;Production planner;Production technician",1,0,"","26000"],
[3119,"Science, engineering and production technicians n.e.c.","School technician;Technical assistant;Technician;Textile consultant;Workshop technician",1,0,"","22300"],
[3121,"Architectural and town planning technicians","Architectural assistant;Architectural technician;Construction planner;Planning enforcement officer",1,0,"","25300"],
[3122,"Draughtspersons","CAD operator;Cartographer;Design technician;Draughtsman",1,0,"","26600"],
[3131,"IT operations technicians","Computer games tester;Database administrator;IT technician;Network administrator;Systems administrator",1,0,"","24700"],
[3132,"IT user support technicians","Customer support analyst;Help desk operator;IT support technician;Systems support officer",1,0,"","23800"],
[3213,"Paramedics","",0,0,"","0"],
[3216,"Dispensing opticians","Dispensing optician;Optical dispenser",1,0,"","19200"],
[3217,"Pharmaceutical technicians","Dispensing technician;Pharmaceutical technician;Pharmacy technician",1,0,"","22200"],
[3218,"Medical and dental technicians","",0,0,"","0"],
[3219,"Health associate professionals n.e.c.","",0,0,"","0"],
[3231,"Youth and community workers","Community development officer;Youth and community worker;Youth project coordinator;Youth worker",1,0,"","23200"],
[3233,"Child and early years officers","",0,0,"","0"],
[3234,"Housing officers","Housing adviser;Housing officer;Homeless prevention officer;Housing support officer",1,0,"","24900"],
[3235,"Counsellors","Counsellor (welfare services);Debt adviser;Drugs and alcohol counsellor;Student counsellor",1,0,"","22700"],
[3239,"Welfare and housing associate professionals n.e.c.","Day centre officer;Health coordinator;Key worker (welfare services);Outreach worker (welfare services);Probation services officer;Project worker (welfare services)",1,0,"","21700"],
[3311,"NCOs and other ranks","",0,0,"","0"],
[3312,"Police officers (sergeant and below)","Detective (police service);Police constable;Police officer;Sergeant;Transport police officer",1,0,"","34200"],
[3313,"Fire service officers (watch manager and below)","Fire engineer;Fire safety officer;Firefighter;Watch manager (fire service)",1,0,"","33000"],
[3314,"Prison service officers (below principal officer)","Prison custodial officer;Prison escort officer;Prison officer;Prison warden",1,0,"","23000"],
[3315,"Police community support officers","",0,0,"","0"],
[3319,"Protective service associate professionals n.e.c.","Customs officer;Immigration officer;Operations manager (security services);Scenes of crime officer;Security manager",1,0,"","29500"],
[3411,"Artists","Artist;Illustrator;Portrait painter;Sculptor",1,1,"England, Scotland, Wales, Northern Ireland","20500"],
[3412,"Authors, writers and translators","Copywriter;Editor (books);Interpreter;Technical author;Translator;Writer",1,0,"","26000"],
[3413,"Actors, entertainers and presenters","Actor;Disc jockey;Entertainer;Presenter (broadcasting);Singer",1,0,"","31100"],
[3414,"Dancers and choreographers","Ballet dancer;Choreographer;Dancer;Dance teacher",1,1,"England, Scotland, Wales, Northern Ireland","21200"],
[3415,"Musicians","Composer;Musician;Organist;Pianist;Song writer;Violinist",1,1,"England, Scotland, Wales, Northern Ireland","31200"],
[3416,"Arts officers, producers and directors","Film editor;Production assistant (broadcasting);Studio manager;Television producer;Theatrical agent",1,1,"England, Scotland, Wales, Northern Ireland","29200"],
[3417,"Photographers, audio-visual and broadcasting equipment operators","Audio visual technician;Cameraman;Photographer;Projectionist;Sound engineer;Theatre technician (entertainment)",1,0,"","20200"],
[3421,"Graphic designers","Commercial artist;Designer (advertising);Graphic artist;Graphic designer;MAC operator",1,1,"England, Scotland, Wales, Northern Ireland","23000"],
[3422,"Product, clothing and related designers","Design consultant;Fashion designer;Furniture designer;Interior designer;Kitchen designer;Textile designer",1,0,"","26800"],
[3441,"Sports players","",0,0,"","0"],
[3442,"Sports coaches, instructors and officials","",0,0,"","0"],
[3443,"Fitness instructors","Aerobics instructor;Fitness instructor;Gym instructor;Lifestyle consultant;Personal trainer;Pilates instructor",1,0,"","15700"],
[3511,"Air traffic controllers","Air traffic control officer;Air traffic controller;Air traffic services assistant;Flight planner",1,0,"","60500"],
[3512,"Aircraft pilots and flight engineers","Airline pilot;First officer (airlines);Flight engineer;Flying instructor;Helicopter pilot",1,0,"","50800"],
[3513,"Ship and hovercraft officers","Chief engineer (shipping);Marine engineer (shipping);Merchant navy officer;Petty officer;Tug master;Yacht skipper",1,0,"","32700"],
[3520,"Legal associate professionals","Barrister’s clerk;Compliance officer;Conveyancer;Legal executive;Litigator;Paralegal",1,0,"","21500"],
[3531,"Estimators, valuers and assessors","Claims assessor;Claims investigator;Engineering surveyor;Estimator;Loss adjuster;Valuer",1,0,"","26200"],
[3532,"Brokers","Foreign exchange dealer;Insurance broker;Investment administrator;Stockbroker;Trader (stock exchange)",1,0,"","35400"],
[3533,"Insurance underwriters","Account handler (insurance);Commercial underwriter;Insurance inspector;Mortgage underwriter;Underwriter",1,0,"","29100"],
[3534,"Finance and investment analysts and advisers","Financial adviser;Financial analyst;Financial consultant;Mortgage adviser;Pensions consultant",1,0,"","28600"],
[3535,"Taxation experts","Tax adviser;Tax consultant;Tax inspector;Taxation specialist",1,0,"","37700"],
[3536,"Importers and exporters","Export controller;Export coordinator;Exporter;Import agent;Importer",1,0,"","24100"],
[3537,"Financial and accounting technicians","Accounting technician;Business associate (banking);Financial controller;Insolvency administrator;Managing clerk (accountancy)",1,0,"","31100"],
[3538,"Financial accounts managers","Accounts manager;Audit manager;Credit manager;Fund manager;Relationship manager (bank)",1,0,"","29800"],
[3539,"Business and related associate professionals n.e.c.","Business systems analyst;Data analyst;Marine consultant;Planning assistant;Project administrator;Project coordinator",1,0,"","24200"],
[3541,"Buyers and procurement officers","Buyer;Procurement officer;Purchasing consultant",1,0,"","26300"],
[3542,"Business sales executives","Corporate account executive;Sales agent;Sales consultant;Sales executive;Technical representative",1,0,"","26700"],
[3543,"Marketing associate professionals","Business development executive;Fundraiser;Market research analyst;Marketing consultant;Marketing executive",1,0,"","23600"],
[3544,"Estate agents and auctioneers","Auctioneer;Auctioneer and valuer;Estate agent;Letting agent;Property consultant",1,0,"","21300"],
[3545,"Sales accounts and business development managers","Account manager (sales);Area sales manager;Business development manager;Product development manager;Sales manager",1,0,"","35100"],
[3546,"Conference and exhibition managers and organisers","Conference coordinator;Event organiser;Events manager;Exhibition organiser;Hospitality manager",1,0,"","21700"],
[3550,"Conservation and environmental associate professionals","Conservation worker;Countryside ranger;National park warden;Park ranger",1,0,"","20900"],
[3561,"Public services associate professionals","Higher executive officer (government);Principle revenue officer (local government);Senior executive officer (government)",1,0,"","31700"],
[3562,"Human resources and industrial relations officers","Employment adviser;Human resources officer;Personnel officer;Recruitment consultant",1,0,"","23600"],
[3563,"Vocational and industrial trainers and instructors","IT trainer;NVQ assessor;Technical instructor;Training consultant;Training manager",1,0,"","24500"],
[3564,"Careers advisers and vocational guidance specialists","Careers adviser;Careers consultant;Careers teacher;Placement officer",1,0,"","23100"],
[3565,"Inspectors of standards and regulations","Building inspector;Driving examiner;Housing inspector;Meat hygiene inspector;Trading standards officer",1,0,"","28600"],
[3567,"Health and safety officers","Fire protection engineer (professional);Health and safety officer;Occupational hygienist;Safety consultant;Safety officer",1,0,"","31000"],
[4112,"National government administrative occupations","Administrative assistant (courts of justice);Administrative officer (government);Civil servant (EO);Clerk (government);Revenue officer (government)",1,0,"","21800"],
[4113,"Local government administrative occupations","",0,0,"","0"],
[4114,"Officers of non-governmental organisations","Administrator (charitable organisation);Organiser (trade union);Secretary (research association);Trade union official",1,0,"","23900"],
[4121,"Credit controllers","",0,0,"","0"],
[4122,"Book-keepers, payroll managers and wages clerks","",0,0,"","0"],
[4123,"Bank and post office clerks","",0,0,"","0"],
[4124,"Finance officers","",0,0,"","0"],
[4129,"Financial administrative occupations n.e.c.","",0,0,"","0"],
[4131,"Records clerks and assistants","",0,0,"","0"],
[4132,"Pensions and insurance clerks and assistants","",0,0,"","0"],
[4133,"Stock control clerks and assistants","",0,0,"","0"],
[4134,"Transport and distribution clerks and assistants","Export clerk;Logistics controller;Shipping clerk;Transport administrator;Transport clerk;Transport coordinator",1,0,"","22400"],
[4135,"Library clerks and assistants","",0,0,"","0"],
[4138,"Human resources administrative occupations","",0,0,"","0"],
[4151,"Sales administrators","Marketing administrator;Sales administrator;Sales clerk;Sales coordinator",1,0,"","19400"],
[4159,"Other administrative occupations n.e.c.","",0,0,"","0"],
[4161,"Office managers","Business support manager;Delivery office manager;Office manager;Practice manager;Sales administration manager;Sales office manager",1,0,"","25100"],
[4162,"Office supervisors","",0,0,"","0"],
[4211,"Medical secretaries","",0,0,"","0"],
[4212,"Legal secretaries","",0,0,"","0"],
[4213,"School secretaries","",0,0,"","0"],
[4214,"Company secretaries","Assistant secretary;Club secretary;Company secretary",1,0,"","23700"],
[4215,"Personal assistants and other secretaries","Executive assistant;PA-secretary;Personal assistant;Personal secretary;Secretary",1,0,"","22300"],
[4216,"Receptionists","",0,0,"","0"],
[4217,"Typists and related keyboard occupations","",0,0,"","0"],
[5111,"Farmers","Agricultural contractor;Agricultural technician;Crofter (farming);Farmer;Herd manager",1,0,"","21100"],
[5112,"Horticultural trades","Grower;Horticulturalist (market gardening);Market Gardener;Nursery Assistant (agriculture);Nurseryman",1,0,"","19000"],
[5113,"Gardeners and landscape gardeners","Garden designer;Gardener;Gardener-handyman;Landscape gardener",1,0,"","19200"],
[5114,"Groundsmen and greenkeepers","Greenkeeper;Groundsman;Groundsperson",1,0,"","19000"],
[5119,"Agricultural and fishing trades n.e.c.","Aboricultural consultant;Bee farmer;Gamekeeper;Share fisherman;Trawler skipper;Tree surgeon",1,1,"England, Scotland, Wales, Northern Ireland","22000"],
[5211,"Smiths and forge workers","Blacksmith;Chain repairer;Farrier;Pewtersmith;Steel presser",1,0,"","19100"],
[5212,"Moulders, core makers and die casters","Core maker (metal trades);Die caster;Moulder (metal trades);Pipe maker (foundry)",1,0,"","17700"],
[5213,"Sheet metal workers","Coppersmith;Panel beater (metal trades);Sheet metal fabricator;Sheet metal worker",1,0,"","20700"],
[5214,"Metal plate workers, and riveters","Boiler maker;Metal plate worker;Plater;Plater-welder",1,0,"","27700"],
[5215,"Welding trades","Fabricator-welder;Fitter-welder;Spot welder (metal);Welder;Welding technician",1,1,"England, Scotland, Wales, Northern Ireland","23100"],
[5216,"Pipe fitters","Pipe engineer;Pipe fitter;Pipe welder-fitter",1,0,"","31700"],
[5221,"Metal machining setters and setter-operators","CNC machinist;CNC programmer;Centre lathe turner;Miller (metal trades);Tool setter;Turner",1,0,"","24000"],
[5222,"Tool makers, tool fitters and markers-out","Die maker;Engineer-toolmaker;Jig maker;Marker-out (engineering);Tool fitter;Tool maker",1,0,"","27100"],
[5223,"Metal working production and maintenance fitters","Agricultural engineer;Bench fitter;Engineering machinist;Fabricator;Installation engineer;Maintenance fitter;Mechanical engineer",1,0,"","24700"],
[5224,"Precision instrument makers and repairers","Calibration engineer;Horologist;Instrument maker;Instrument mechanic;Instrument technician;Optical technician;Precision engineer;Watchmaker",1,0,"","23300"],
[5225,"Air-conditioning and refrigeration engineers","Air conditioning engineer;Air conditioning fitter;Refrigeration engineer;Refrigeration technician;Service engineer (refrigeration)",1,0,"","28000"],
[5231,"Vehicle technicians, mechanics and electricians","Auto electrician;Car mechanic;HGV mechanic;Mechanic (garage);MOT tester;Motor mechanic;Motor vehicle technician;Technician (motor vehicles);Vehicle technician",1,0,"","22800"],
[5232,"Vehicle body builders and repairers","Bodyshop technician;Car body repairer;Coach builder;Panel beater;Restoration technician (motor vehicles);Vehicle builder",1,0,"","22600"],
[5234,"Vehicle paint technicians","Car paint sprayer;Coach painter;Paint technician (motor vehicles);Vehicle refinisher",1,0,"","23300"],
[5235,"Aircraft maintenance and related trades","Aeronautical engineer;Aircraft electrician;Aircraft engineer;Aircraft fitter;Aircraft mechanic;Maintenance engineer (aircraft)",1,0,"","29500"],
[5236,"Boat and ship builders and repairers","Boat builder;Fitter (boat building);Frame turner (ship building);Marine engineer;Ship’s joiner;Shipwright",1,0,"","23800"],
[5237,"Rail and rolling stock builders and repairers","Coach repairer (railways);Mechanical fitter (railway and rolling stock);Railway engineer;Rolling stock technician",1,0,"","37100"],
[5241,"Electricians and electrical fitters","Electrical contractor;Electrical engineer;Electrical fitter;Electrician",1,0,"","26400"],
[5242,"Telecommunications engineers","Cable jointer;Customer service engineer (telecommunications);Installation engineer (telecommunications);Network officer (telecommunications);Telecommunications engineer;Telephone engineer",1,0,"","28500"],
[5244,"TV, video and audio engineers","Installation engineer (radio, television and video);Satellite engineer;Service engineer (radio, television and video);Technician (radio, television and video);Television engineer",1,0,"","22000"],
[5245,"IT engineers","Computer repairer;Computer service engineer;Hardware engineer (computer);Maintenance engineer (computer servicing)",1,0,"","21900"],
[5249,"Electrical and electronic trades n.e.c.","Alarm engineer;Electronics engineer;Field engineer;Linesman;Service engineer",1,0,"","28200"],
[5250,"Skilled metal, electrical and electronic trades supervisors","Electrical supervisor;Maintenance supervisor (manufacturing);Workshop manager",1,0,"","31900"],
[5311,"Steel erectors","Steel erector;Steel fabricator;Steel worker (structural engineering)",1,0,"","23900"],
[5312,"Bricklayers and masons","Bricklayer;Dry stone waller;Stone mason",1,1,"England, Scotland, Wales, Northern Ireland","23300"],
[5313,"Roofers, roof tilers and slaters","Mastic asphalt spreader;Roof tiler;Roofer;Roofing contractor;Slater;Thatcher",1,1,"England, Scotland, Wales, Northern Ireland","20200"],
[5314,"Plumbers and heating and ventilating engineers","Gas engineer;Gas service engineer;Heating and ventilating engineer;Heating engineer;Plumber;Plumbing and heating engineer",1,0,"","26700"],
[5315,"Carpenters and joiners","Carpenter;Carpenter and joiner;Joiner;Kitchen fitter;Shop fitter",1,1,"England, Scotland, Wales, Northern Ireland","22500"],
[5316,"Glaziers, window fabricators and fitters","Glass Cutter;Glazier;Installer (double glazing);Window fabricator;Window fitter",1,0,"","19200"],
[5319,"Construction and building trades n.e.c.","Acoustician;Builder;Building contractor;Fencer;Maintenance manager (buildings and other structures);Property developer (building construction)",1,1,"England, Scotland, Wales, Northern Ireland","22200"],
[5321,"Plasterers","Dryliner;Fibrous plasterer;Plasterer;Plastering contractor",1,1,"England, Scotland, Wales, Northern Ireland","24000"],
[5322,"Floorers and wall tilers","Carpet fitter;Ceramic tiler;Flooring contractor;Mosaic floor layer",1,0,"","23000"],
[5323,"Painters and decorators","Artexer;French polisher;Paper hanger;Ship sprayer;Wood stainer",1,0,"","21200"],
[5330,"Construction and building trades supervisors","Builder’s foreman;Construction foreman;Construction supervisor;Maintenance supervisor;Site foreman",1,0,"","32200"],
[5411,"Weavers and knitters","Carpet weaver;Knitter;Knitwear manufacturer;Weaver",1,0,"","18600"],
[5412,"Upholsterers","Curtain fitter;Curtain maker;Soft furnisher;Trimmer (furniture mfr);Upholsterer",1,0,"","18400"],
[5413,"Footwear and leather working trades","Cobbler;Leather worker (leather goods mfr;Machinist (leather goods mfr);Shoe machinist;Shoe repairer",1,0,"","17100"],
[5414,"Tailors and dressmakers","Cutter (hosiery, knitwear mfr);Dressmaker;Fabric cutter;Tailor;Tailoress",1,0,"","18000"],
[5419,"Textiles, garments and related trades n.e.c.","Clothing manufacturer;Embroiderer;Hand sewer;Sail maker;Upholstery cutter",1,0,"","15800"],
[5421,"Pre-press technicians","Compositor;Plate maker;Pre-press manager;Pre-press technician;Type setter",1,0,"","18800"],
[5422,"Printers","Lithographic printer;Machine minder (printing);Print manager;Screen printer;Wallpaper printer",1,0,"","21800"],
[5423,"Print finishing and binding workers","Binder’s assistant;Book binder;Finishing supervisor (printing);Print finisher",1,0,"","18800"],
[5431,"Butchers","Butcher;Butcher’s assistant;Butchery manager;Master butcher;Slaughterman",1,0,"","20400"],
[5432,"Bakers and flour confectioners","Baker;Baker’s assistant;Bakery manager;Cake decorator;Confectioner",1,0,"","18900"],
[5433,"Fishmongers and poultry dressers","Butcher (fish, poultry);Filleter (fish);Fish processor;Fishmonger;Poultry processor",1,0,"","17100"],
[5434,"Chefs","Chef;Chef-manager;Head chef;Pastry chef",1,0,"","17100"],
[5435,"Cooks","",0,0,"","0"],
[5436,"Catering and bar managers","Bar manager;Catering manager;Floor manager (restaurant);Kitchen manager;Steward (club)",1,0,"","18600"],
[5441,"Glass and ceramics makers, decorators and finishers","Ceramic artist;Glass blower;Potter (ceramics mfr);Pottery worker;Sprayer (ceramics mfr);Stained glass artist",1,0,"","19900"],
[5442,"Furniture makers and other craft woodworkers","Antiques restorer;Cabinet maker;Coffin maker;Furniture restorer;Picture framer;Sprayer (furniture mfr)",1,0,"","20000"],
[5443,"Florists","Floral assistant;Floral designer;Florist;Flower arranger",1,0,"","14200"],
[5449,"Other skilled trades n.e.c.","Diamond mounter;Engraver;Goldsmith;Paint sprayer;Piano tuner;Sign maker;Silversmith;Wig maker",1,0,"","21400"],
[6121,"Nursery nurses and assistants","Crèche assistant;Crèche worker;Nursery assistant;Nursery nurse",1,0,"","15000"],
[6122,"Childminders and related occupations","Au pair;Child care assistant;Child minder;Nanny",1,0,"","17500"],
[6123,"Playworkers","Playgroup assistant;Playgroup leader;Playgroup supervisor;Playworker",1,0,"","13300"],
[6125,"Teaching assistants","Classroom assistant;School assistant;Teaching assistant",1,0,"","15300"],
[6126,"Educational support assistants","Education support assistant;Learning support assistant;Non-teaching assistant (schools);Special needs assistant (educational establishments);Support assistant (educational establishments)",1,0,"","14700"],
[6131,"Veterinary nurses","Animal nurse;Veterinary nurse",1,0,"","18100"],
[6132,"Pest control officers","",0,0,"","0"],
[6139,"Animal care services occupations n.e.c.","Animal technician;Canine beautician;Groom;Kennel assistant;Kennel maid;Stable hand",1,0,"","17800"],
[6141,"Nursing auxiliaries and assistants","",0,0,"","0"],
[6142,"Ambulance staff (excluding paramedics)","",0,0,"","0"],
[6143,"Dental nurses","",0,0,"","0"],
[6144,"Houseparents and residential wardens","Foster carer;Matron (residential home);Resident warden;Team leader (residential care home);Warden (sheltered housing)",1,0,"","18300"],
[6146,"Senior care workers","Senior care assistant;Senior carer;Senior support worker (Local government: welfare services);Team leader (nursing home)",1,1,"England, Scotland, Wales, Northern Ireland","18600"],
[6147,"Care escorts","",0,0,"","0"],
[6148,"Undertakers, mortuary and crematorium assistants","",0,0,"","0"],
[6211,"Sports and leisure assistants","",0,0,"","0"],
[6212,"Travel agents","",0,0,"","0"],
[6214,"Air travel assistants","Air hostess;Cabin crew;Customer service agent (travel);Flight attendant;Passenger service agent",1,0,"","16300"],
[6215,"Rail travel assistants","Retail service manager (railways);Station assistant (underground railway);Ticket inspector (railways);Train conductor;Train manager",1,0,"","28700"],
[6219,"Leisure and travel service occupations n.e.c.","",0,0,"","0"],
[6221,"Hairdressers and barbers","",0,0,"","0"],
[6222,"Beauticians and related occupations","",0,0,"","0"],
[6231,"Housekeepers and related occupations","",0,0,"","0"],
[6232,"Caretakers","",0,0,"","0"],
[6240,"Cleaning and housekeeping managers and supervisors","",0,0,"","0"],
[7111,"Sales and retail assistants","",0,0,"","0"],
[7112,"Retail cashiers and check-out operators","",0,0,"","0"],
[7113,"Telephone salespersons","",0,0,"","0"],
[7114,"Pharmacy and other dispensing assistants","",0,0,"","0"],
[7115,"Vehicle and parts salespersons and advisers","",0,0,"","0"],
[7121,"Collector salespersons and credit agents","",0,0,"","0"],
[7122,"Debt, rent and other cash collectors","",0,0,"","0"],
[7123,"Roundspersons and van salespersons","",0,0,"","0"],
[7124,"Market and street traders and assistants","",0,0,"","0"],
[7125,"Merchandisers and window dressers","Merchandiser;Sales merchandiser;Visual merchandising manager;Window dresser",1,0,"","18300"],
[7129,"Sales related occupations n.e.c.","",0,0,"","0"],
[7130,"Sales supervisors","Sales supervisor (retail trade: delivery round);Section manager (retail trade);Shop supervisor (retail trade);Supervisor (retail, wholesale trade);Team leader (retail trade)",1,0,"","19900"],
[7211,"Call and contact centre occupations","",0,0,"","0"],
[7213,"Telephonists","",0,0,"","0"],
[7214,"Communication operators","",0,0,"","0"],
[7215,"Market research interviewers","Interviewer (market research);Market researcher (interviewing);Telephone interviewer;Telephone researcher;Traffic enumerator",1,0,"","10600"],
[7219,"Customer service occupations n.e.c.","",0,0,"","0"],
[7220,"Customer service managers and supervisors","After sales manager;Call centre supervisor;Customer service manager;Customer service supervisor;Team leader (customer care)",1,0,"","24600"],
[8111,"Food, drink and tobacco process operatives","",0,0,"","0"],
[8112,"Glass and ceramics process operatives","",0,0,"","0"],
[8113,"Textile process operatives","",0,0,"","0"],
[8114,"Chemical and related process operatives","",0,0,"","0"],
[8115,"Rubber process operatives","",0,0,"","0"],
[8116,"Plastics process operatives","",0,0,"","0"],
[8117,"Metal making and treating process operatives","",0,0,"","0"],
[8118,"Electroplaters","",0,0,"","0"],
[8119,"Process operatives n.e.c.","",0,0,"","0"],
[8121,"Paper and wood machine operatives","",0,0,"","0"],
[8122,"Coal mine operatives","",0,0,"","0"],
[8123,"Quarry workers and related operatives","",0,0,"","0"],
[8124,"Energy plant operatives","Boilerman;Control room operator(electric);Hydraulic engineman;Plant operator (electricity supplier);Power station operator",1,0,"","27200"],
[8125,"Metal working machine operatives","",0,0,"","0"],
[8126,"Water and sewerage plant operatives","Controller (water treatment);Plant operator (sewage works);Pump attendant;Water treatment engineer;Water treatment operator",1,0,"","24200"],
[8127,"Printing machine assistants","",0,0,"","0"],
[8129,"Plant and machine operatives n.e.c.","",0,0,"","0"],
[8131,"Assemblers (electrical and electronic products)","",0,0,"","0"],
[8132,"Assemblers (vehicles and metal goods)","",0,0,"","0"],
[8133,"Routine inspectors and testers","",0,0,"","0"],
[8134,"Weighers, graders and sorters","",0,0,"","0"],
[8135,"Tyre, exhaust and windscreen fitters","",0,0,"","0"],
[8137,"Sewing machinists","",0,0,"","0"],
[8139,"Assemblers and routine operatives n.e.c.","",0,0,"","0"],
[8141,"Scaffolders, stagers and riggers","",0,0,"","0"],
[8142,"Road construction operatives","",0,0,"","0"],
[8143,"Rail construction and maintenance operatives","",0,0,"","0"],
[8149,"Construction operatives n.e.c.","",0,0,"","0"],
[8211,"Large goods vehicle drivers","",0,0,"","0"],
[8212,"Van drivers","",0,0,"","0"],
[8213,"Bus and coach drivers","",0,0,"","0"],
[8214,"Taxi and cab drivers and chauffeurs","",0,0,"","0"],
[8215,"Driving instructors","Driving instructor;HGV instructor;Instructor (driving school);Motorcycle instructor",1,0,"","23400"],
[8221,"Crane drivers","",0,0,"","0"],
[8222,"Fork-lift truck drivers","",0,0,"","0"],
[8223,"Agricultural machinery drivers","",0,0,"","0"],
[8229,"Mobile machine drivers and operatives n.e.c.","",0,0,"","0"],
[8231,"Train and tram drivers","",0,0,"","0"],
[8232,"Marine and waterways transport operatives","Engine room attendant (shipping);Engineer, nos (boat, barge);Ferryman;Merchant seaman;Seaman (shipping)",1,0,"","24300"],
[8233,"Air transport operatives","",0,0,"","0"],
[8234,"Rail transport operatives","",0,0,"","0"],
[8239,"Other drivers and transport operatives n.e.c.","",0,0,"","0"],
[9111,"Farm workers","",0,0,"","0"],
[9112,"Forestry workers","",0,0,"","0"],
[9119,"Fishing and other elementary agriculture occupations n.e.c.","Vent chick sexer;Deckhand on large fishing vessel (9 metres and above);For both job titles, the job must require 3 or more years’ full-time experience. This experience must not have been gained through illegal working.;Other jobs in this occupation are not eligible",1,1,"England, Scotland, Wales, Northern Ireland","18000"],
[9120,"Elementary construction occupations","",0,0,"","0"],
[9132,"Industrial cleaning process occupations","",0,0,"","0"],
[9134,"Packers, bottlers, canners and fillers","",0,0,"","0"],
[9139,"Elementary process plant occupations n.e.c.","",0,0,"","0"],
[9211,"Postal workers, mail sorters, messengers and couriers","",0,0,"","0"],
[9219,"Elementary administration occupations n.e.c.","",0,0,"","0"],
[9231,"Window cleaners","",0,0,"","0"],
[9232,"Street cleaners","",0,0,"","0"],
[9233,"Cleaners and domestics","",0,0,"","0"],
[9234,"Launderers, dry cleaners and pressers","",0,0,"","0"],
[9235,"Refuse and salvage occupations","",0,0,"","0"],
[9236,"Vehicle valeters and cleaners","",0,0,"","0"],
[9239,"Elementary cleaning occupations n.e.c.","",0,0,"","0"],
[9241,"Security guards and related occupations","",0,0,"","0"],
[9242,"Parking and civil enforcement occupations","",0,0,"","0"],
[9244,"School midday and crossing patrol occupations","",0,0,"","0"],
[9249,"Elementary security occupations n.e.c.","",0,0,"","0"],
[9251,"Shelf fillers","",0,0,"","0"],
[9259,"Elementary sales occupations n.e.c.","",0,0,"","0"],
[9260,"Elementary storage occupations","",0,0,"","0"],
[9271,"Hospital porters","",0,0,"","0"],
[9272,"Kitchen and catering assistants","",0,0,"","0"],
[9273,"Waiters and waitresses","",0,0,"","0"],
[9274,"Bar staff","",0,0,"","0"],
[9275,"Leisure and theme park attendants","",0,0,"","0"],
[9279,"Other elementary services occupations n.e.c.","",0,0,"","0"]];

// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", function() {
  // Start measuring time for performance evaluation
  var startTime = window.performance.now();

  // Initialize variables
  var chosenprofession = [];
  var divElement = document.getElementById("resultJob");
  
  // Get reference to salary input field
  const salaryInput = document.getElementById('exampleInputSalary');
  
  // Add input event listener to format salary input with spaces
  salaryInput.addEventListener('input', function() {
      let value = this.value.replace(/\D/g, '');
      this.value = formatNumberWithSpaces(value);
  });
  
  // Format a number by adding spaces as thousands separators
  function formatNumberWithSpaces(number) {
      return number.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  // Hide the resultJob div element initially
  divElement.style.display = "none";
  // Get reference to a checkbox element
  const checkbox = document.getElementById('shortageOccupation');
  // Add change event listener to the checkbox
  checkbox.addEventListener('change', function() {
      // Get the ID to lookup from somewhere (not provided in the code)
      if (this.checked) {
          isAShortageOccupation = 1;
          calculationFunction();
      } else {
        isAShortageOccupation = 0;
        calculationFunction();       
      }
  });

  // Get reference to a table element
  var table = document.getElementById('example1');
  var tbody = table.querySelector('tbody');
  // Populate the table with data
  data.forEach(function(item) {
      var row = document.createElement('tr');
      row.innerHTML = `
          <td>${item[0]}</td>
          <td>${item[1]}</td>
          <td>${item[2].split(';').join(', ')}</td>
          <td>${item[5]}</td>
          <td>£${item[6]}</td>
      `;
      tbody.appendChild(row);
  });
  // Get reference to a select element
  var selectElement_new = document.getElementById("selectElement");

  // Add change event listener to the select element
  selectElement_new.addEventListener("change", function() {
      // Find the index of the selected country in the "dataCountryFile" array
      var index = dataCountryFile.findIndex(function(element) {
          return element[0] === selectElement.value;
      });

      // Toggle the collapseExampleFirst element based on the selected country
      if (dataCountryFile[index][1] != 1) {
          document.getElementById("collapseExampleFirst").classList.add("show");
      } else {
          document.getElementById("collapseExampleFirst").classList.remove("show");
      }     
  });
  // End measuring time and log the loading time
  var endTime = window.performance.now();
  console.log("Time loading:", endTime - startTime, "ms");
});