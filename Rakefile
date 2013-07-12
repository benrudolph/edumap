require 'sinatra/activerecord/rake'
require './app.rb'

task :load do
  require 'csv'

  CSV.foreach('./raw/all.csv', :headers => true) do |row|

    o = Operation.find_or_create_by(:country => row['Operation'])
    ppg = Ppg.find_or_create_by(:name => row['PPG'])

    i = nil; p = nil
    # Must be impact indicator
    if row['Objective']
      i = ImpactIndicator.find_or_create_by(:objective => row['Objective'],
                                 :name => row['ImpactIndicator'])
    elsif row['Output']
      p = PerfIndicator.find_or_create_by(:output => row['Output'],
                                 :name => row['PerformanceIndicator'])
    end

    d = Datum.create(:yer => (row['YER'] || row['YERPer']),
                     :olbudget => (row['OLBudgetImpact'] || row['OLBudgetPer']),
                     :aolbudget => (row['AOLBudgetImpact'] || row['AOLBudgetPer']),
                     :baseline => row['Baseline'],
                     :standard => row['Standard'],
                     :oltarget => (row['TargetOL'] || row['TargetOLPer']),
                     :optarget => (row['TargetOP'] || row['TargetOPPer']),
                     :myr => (row['MYR'] || row['MYRPer']),
                     :year => row['Planningyear'])

    d.indicator = i if i
    d.indicator = p if p

    d.operation = o
    d.ppg = ppg

    o.save
    ppg.save
    d.save
    i.save if i
    p.save if p

  end

end

task :all do
  Rake::Task['clear'].invoke
  Rake::Task['load'].invoke
  Rake::Task['convert'].invoke
  Rake::Task['delete_ROs'].invoke
end

task :clear do
  puts "Clearing database"
  Operation.delete_all
  Ppg.delete_all
  Datum.delete_all
  PerfIndicator.delete_all
  ImpactIndicator.delete_all
end

task :delete_ROs do
  Operation.destroy_all(:iso => nil)
end

task :add_actions do

end

task :convert do
  codes = {
    "Aruba" => "ABW",
    "Afghanistan" => "AFG",
    "Angola" => "AGO",
    "Anguilla" => "AIA",
    "Aland Islands" => "ALA",
    "Albania" => "ALB",
    "Andorra" => "AND",
    "United Arab Emirates" => "ARE",
    "Argentina" => "ARG",
    "Armenia" => "ARM",
    "American Samoa" => "ASM",
    "Antarctica" => "ATA",
    "French Southern Territories" => "ATF",
    "Antigua and Barbuda" => "ATG",
    "Australia" => "AUS",
    "Austria" => "AUT",
    "Azerbaijan" => "AZE",
    "Burundi" => "BDI",
    "Belgium" => "BEL",
    "Benin" => "BEN",
    "Bonaire, Sint Eustatius and Saba" => "BES",
    "Burkina Faso" => "BFA",
    "Bangladesh" => "BGD",
    "Bulgaria" => "BGR",
    "Bahrain" => "BHR",
    "Bahamas" => "BHS",
    "Bosnia and Herzegovina" => "BIH",
    "Saint Barthelemy" => "BLM",
    "Belarus" => "BLR",
    "Belize" => "BLZ",
    "Bermuda" => "BMU",
    "Bolivia" => "BOL",
    "Brazil" => "BRA",
    "Barbados" => "BRB",
    "Brunei Darussalam" => "BRN",
    "Bhutan" => "BTN",
    "Bouvet Island" => "BVT",
    "Botswana" => "BWA",
    "Central African Republic" => "CAF",
    "Canada" => "CAN",
    "Cocos (Keeling) Islands" => "CCK",
    "Switzerland" => "CHE",
    "Chile" => "CHL",
    "China" => "CHN",
    "Cote dIvoire" => "CIV",
    "Cameroon" => "CMR",
    "Democratic Republic of the Congo" => "COD",
    "Congo" => "COG",
    "Cook Islands" => "COK",
    "Colombia" => "COL",
    "Comoros" => "COM",
    "Cape Verde" => "CPV",
    "Costa Rica" => "CRI",
    "Cuba" => "CUB",
    "Curacao" => "CUW",
    "Christmas Island" => "CXR",
    "Cayman Islands" => "CYM",
    "Cyprus" => "CYP",
    "Czech Republic" => "CZE",
    "Germany" => "DEU",
    "Djibouti" => "DJI",
    "Dominica" => "DMA",
    "Denmark" => "DNK",
    "Dominican Republic" => "DOM",
    "Algeria" => "DZA",
    "Ecuador" => "ECU",
    "Egypt" => "EGY",
    "Eritrea" => "ERI",
    "Western Sahara" => "ESH",
    "Spain" => "ESP",
    "Estonia" => "EST",
    "Ethiopia" => "ETH",
    "Finland" => "FIN",
    "Fiji" => "FJI",
    "Falkland Islands (Malvinas)" => "FLK",
    "France" => "FRA",
    "Faroe Islands" => "FRO",
    "Micronesia, Federated States of" => "FSM",
    "Gabon" => "GAB",
    "United Kingdom" => "GBR",
    "Georgia" => "GEO",
    "Guernsey" => "GGY",
    "Ghana" => "GHA",
    "Gibraltar" => "GIB",
    "Guinea" => "GIN",
    "Guadeloupe" => "GLP",
    "Gambia" => "GMB",
    "Guinea-Bissau" => "GNB",
    "Equatorial Guinea" => "GNQ",
    "Greece" => "GRC",
    "Grenada" => "GRD",
    "Greenland" => "GRL",
    "Guatemala" => "GTM",
    "French Guiana" => "GUF",
    "Guam" => "GUM",
    "Guyana" => "GUY",
    "Hong Kong" => "HKG",
    "Heard Island and McDonald Islands" => "HMD",
    "Honduras" => "HND",
    "Croatia" => "HRV",
    "Haiti" => "HTI",
    "Hungary" => "HUN",
    "Indonesia" => "IDN",
    "Isle of Man" => "IMN",
    "India" => "IND",
    "British Indian Ocean Territory" => "IOT",
    "Ireland" => "IRL",
    "Islamic Republic of Iran" => "IRN",
    "Iraq" => "IRQ",
    "Iceland" => "ISL",
    "Israel" => "ISR",
    "Italy" => "ITA",
    "Jamaica" => "JAM",
    "Jersey" => "JEY",
    "Jordan" => "JOR",
    "Japan" => "JPN",
    "Kazakhstan" => "KAZ",
    "Kenya" => "KEN",
    "Kyrgyzstan" => "KGZ",
    "Cambodia" => "KHM",
    "Kiribati" => "KIR",
    "Saint Kitts and Nevis" => "KNA",
    "Korea, Republic of" => "KOR",
    "Kuwait" => "KWT",
    "Lao People's Democratic Republic" => "LAO",
    "Lebanon" => "LBN",
    "Liberia" => "LBR",
    "Libya" => "LBY",
    "Saint Lucia" => "LCA",
    "Liechtenstein" => "LIE",
    "Sri Lanka" => "LKA",
    "Lesotho" => "LSO",
    "Lithuania" => "LTU",
    "Luxembourg" => "LUX",
    "Latvia" => "LVA",
    "Macao" => "MAC",
    "Saint Martin (French part)" => "MAF",
    "Morocco" => "MAR",
    "Monaco" => "MCO",
    "Moldova, Republic of" => "MDA",
    "Madagascar" => "MDG",
    "Maldives" => "MDV",
    "Mexico" => "MEX",
    "Marshall Islands" => "MHL",
    "Former Yugoslav Republic of Macedonia" => "MKD",
    "Mali" => "MLI",
    "Malta" => "MLT",
    "Myanmar" => "MMR",
    "Montenegro" => "MNE",
    "Mongolia" => "MNG",
    "Northern Mariana Islands" => "MNP",
    "Mozambique" => "MOZ",
    "Mauritania" => "MRT",
    "Montserrat" => "MSR",
    "Martinique" => "MTQ",
    "Mauritius" => "MUS",
    "Malawi" => "MWI",
    "Malaysia" => "MYS",
    "Mayotte" => "MYT",
    "Namibia" => "NAM",
    "New Caledonia" => "NCL",
    "Niger" => "NER",
    "Norfolk Island" => "NFK",
    "Nigeria" => "NGA",
    "Nicaragua" => "NIC",
    "Niue" => "NIU",
    "Netherlands" => "NLD",
    "Norway" => "NOR",
    "Nepal" => "NPL",
    "Nauru" => "NRU",
    "New Zealand" => "NZL",
    "Oman" => "OMN",
    "Pakistan" => "PAK",
    "Panama" => "PAN",
    "Pitcairn" => "PCN",
    "Peru" => "PER",
    "Philippines" => "PHL",
    "Palau" => "PLW",
    "Papua New Guinea" => "PNG",
    "Poland" => "POL",
    "Puerto Rico" => "PRI",
    "Korea, Democratic People's Republic of" => "PRK",
    "Portugal" => "PRT",
    "Paraguay" => "PRY",
    "Palestine, State of" => "PSE",
    "French Polynesia" => "PYF",
    "Qatar" => "QAT",
    "Reunion" => "REU",
    "Romania" => "ROU",
    "Russian Federation" => "RUS",
    "Rwanda" => "RWA",
    "Saudi Arabia" => "SAU",
    "Sudan" => "SDN",
    "Senegal" => "SEN",
    "Singapore" => "SGP",
    "South Georgia and the South Sandwich Islands" => "SGS",
    "Saint Helena, Ascension and Tristan da Cunha" => "SHN",
    "Svalbard and Jan Mayen" => "SJM",
    "Solomon Islands" => "SLB",
    "Sierra Leone" => "SLE",
    "El Salvador" => "SLV",
    "San Marino" => "SMR",
    "Somalia" => "SOM",
    "Saint Pierre and Miquelon" => "SPM",
    "Serbia" => "SRB",
    "South Sudan" => "SSD",
    "Sao Tome and Principe" => "STP",
    "Suriname" => "SUR",
    "Slovakia" => "SVK",
    "Slovenia" => "SVN",
    "Sweden" => "SWE",
    "Swaziland" => "SWZ",
    "Sint Maarten (Dutch part)" => "SXM",
    "Seychelles" => "SYC",
    "Syrian Arab Republic" => "SYR",
    "Turks and Caicos Islands" => "TCA",
    "Chad" => "TCD",
    "Togo" => "TGO",
    "Thailand" => "THA",
    "Tajikistan" => "TJK",
    "Tokelau" => "TKL",
    "Turkmenistan" => "TKM",
    "Timor-Leste" => "TLS",
    "Tonga" => "TON",
    "Trinidad and Tobago" => "TTO",
    "Tunisia" => "TUN",
    "Turkey" => "TUR",
    "Tuvalu" => "TUV",
    "Taiwan, Province of China" => "TWN",
    "Tanzania" => "TZA",
    "Uganda" => "UGA",
    "Ukraine" => "UKR",
    "United States Minor Outlying Islands" => "UMI",
    "Uruguay" => "URY",
    "United States of America" => "USA",
    "Uzbekistan" => "UZB",
    "Holy See (Vatican City State)" => "VAT",
    "Saint Vincent and the Grenadines" => "VCT",
    "Venezuela" => "VEN",
    "Virgin Islands, British" => "VGB",
    "Virgin Islands, U.S." => "VIR",
    "Viet Nam" => "VNM",
    "Vanuatu" => "VUT",
    "Wallis and Futuna" => "WLF",
    "Samoa" => "WSM",
    "Yemen" => "YEM",
    "South Africa" => "ZAF",
    "Zambia" => "ZMB",
    "Zimbabwe" => "ZWE",
  }

  ops = Operation.all
  ops.map { |o| o.iso = codes[o.country]; o.save }
end
