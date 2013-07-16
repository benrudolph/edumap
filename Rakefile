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
  Rake::Task['add_latlng'].invoke
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

  actions = {
    'learning achievements in primary school improved' => [
      '% of primary school-aged children enrolled in primary education',
      '# of children enrolled in primary education',
      '% of children in grade 3 who transition to grade 4',
      '% of grade 3 students who can read at grade 3 level (assessment)',
      '# of grade 3 students who can read at grade 3 level',
      '# of children per teacher',
      '# of teachers with professional teaching qualifications'
    ],
    'safe learning environments in school ensured' => [
      '% of schools that meet safe learning environment standards',
      '% of teachers who are female',
      '% of educational facilities that meet safety and accessibility standards',
      '% of schools with safe access to separate latrines for boys and girls',
      '% of schools that enforce a teacher code of conduct that has been developed in a participatory way',
      '% of schools with a policy to use positive discipline methods (non-corporal punishment)',
    ],
    'access to formal secondary education opportunities improved' => [
      '# of students enrolled secondary education',
      '% of secondary school graduates (successful completion of final grade)',
    ],
    'access to higher education opportunities for refugee young people improved' => [
      '# of PoC enrolled in UNHCR supported tertiary education programmes',
      '# of PoC who receive tertiary education scholarships',
      '% of youths aged 15-24 enrolled in certified livelihoods training',
      '% of vocational and technical skills training students who are youths aged 15-24'
    ],
    'opportunities for lifelong and available education according to need are ensured' => [
      '% of children aged 3-5 yrs enrolled in early childhood education',
      '# of children aged 3-5 enrolled in early child hood education',
      '% of youths aged 15-24 enrolled in certified livelihoods training',
      '% of vocational and technical skills training students who are youths aged 15-24',
      '# of education programmes with life skills initiatives',
      '# of persons participating in vocational training',
      '% of PoC aged 15-59 who are literate (survey)',
      '# of PoC enrolled in literacy classes'
    ],
    'access to education opportunities during emergencies provided' => [
      '% of PoC who benefit from emergency education during a UNHCR emergency response',
      '% of preparedness plans that include emergency education (not in RF)'
    ]
    'quality and protective education ensured through partnerships' => [
      '# of country programmes with a strong working partnership with the MoE',
      'Extent persons of concern have access to national education systems',
      '# of months this calendar year during which UNHCR has had an active relationship with the Ministry of Education',
      '# of national authorities that have endorsed the UNHCR education strategy',
      '# of PoC enrolled in language classes'
    ],
    'capacities of UNHCR personnel and partners developed' => [
      '# of months this calendar year during which UNHCR has had an active relationship with the Ministry of Education',
      '# of national authorities that have endorsed the UNHCR education strategy',
      '# of PoC enrolled in language classes'
    ],
    'mechanisms for learning accountability built and strengthened' => [
      '% of programmes who use data and impact monitoring',
      '# of operations with baseline information on education',
      '# of education programmes with logframes and M&E systems in place',
      '# of operations that use EMIS'
    ],
    'education opportunities expanded through innovative use of ICT' => [
      '% of programmes with access to at least one form of ITC in education',
      '% of schools reporting an quality change in learning due to the use of ITC',
      '% of primary and secondary schools providing students daily access to computers',
      '% of primary ad secondary schools providing students daily access to e-books, tablets or other similar devices'
    ]
  }

end

task :add_latlng do
  positions = [{
    :iso =>'AND',
    :lng  => 42.65604389629997,
    :lat  => 1.7865427778319827
    },
    {
    :iso =>'ARE',
    :lng  => 26.08415985107422,
    :lat  => 56.38166046142578
    },
    {
    :iso =>'AFG',
    :lng  => 38.483418,
    :lat  => 74.879448
    },
    {
    :iso =>'ATG',
    :lng  => 17.729387,
    :lat  => -61.672421
    },
    {
    :iso =>'AIA',
    :lng  => 18.283424,
    :lat  => -62.971359
    },
    {
    :iso =>'ALB',
    :lng  => 42.665611,
    :lat  => 21.068472
    },
    {
    :iso =>'ARM',
    :lng  => 41.301834,
    :lat  => 46.772435045159995
    },
    {
    :iso =>'AGO',
    :lng  => -4.376826,
    :lat  => 24.082119
    },
    {
    :iso =>'ATA',
    :lng  => -60.515533,
    :lat  => 179.9999
    },
    {
    :iso =>'ARG',
    :lng  => -21.781277,
    :lat  => -53.591835
    },
    {
    :iso =>'ASM',
    :lng  => -11.0497,
    :lat  => -169.416077
    },
    {
    :iso =>'AUT',
    :lng  => 49.017056,
    :lat  => 17.162722
    },
    {
    :iso =>'AUS',
    :lng  => -10.062805,
    :lat  => 153.639252
    },
    {
    :iso =>'ABW',
    :lng  => 12.623718127152925,
    :lat  => -69.86575120104982
    },
    {
    :iso =>'ALA',
    :lng  => 60.488861,
    :lat  => 21.011862
    },
    {
    :iso =>'AZE',
    :lng  => 41.90564,
    :lat  => 50.370083
    },
    {
    :iso =>'BIH',
    :lng  => 45.239193,
    :lat  => 19.622223
    },
    {
    :iso =>'BRB',
    :lng  => 13.327257,
    :lat  => -59.420376
    },
    {
    :iso =>'BGD',
    :lng  => 26.631945,
    :lat  => 92.673668
    },
    {
    :iso =>'BEL',
    :lng  => 51.505444,
    :lat  => 6.403861
    },
    {
    :iso =>'BFA',
    :lng  => 15.082593,
    :lat  => 2.405395
    },
    {
    :iso =>'BGR',
    :lng  => 44.21764,
    :lat  => 28.612167
    },
    {
    :iso =>'BHR',
    :lng  => 26.282583,
    :lat  => 50.664471
    },
    {
    :iso =>'BDI',
    :lng  => -2.310123,
    :lat  => 30.847729
    },
    {
    :iso =>'BEN',
    :lng  => 12.418347,
    :lat  => 3.851701
    },
    {
    :iso =>'BLM',
    :lng  => 17.928808791949283,
    :lat  => -62.788983372985854
    },
    {
    :iso =>'BMU',
    :lng  => 32.393833,
    :lat  => -64.651993
    },
    {
    :iso =>'BRN',
    :lng  => 5.047167,
    :lat  => 115.359444
    },
    {
    :iso =>'BOL',
    :lng  => -9.680567,
    :lat  => -57.45809600000001
    },
    {
    :iso =>'BES',
    :lng  => 12.304535,
    :lat  => -68.192307
    },
    {
    :iso =>'BRA',
    :lng  => 5.264877,
    :lat  => -32.392998
    },
    {
    :iso =>'BHS',
    :lng  => 26.919243,
    :lat  => -74.423874
    },
    {
    :iso =>'BTN',
    :lng  => 28.323778,
    :lat  => 92.125191
    },
    {
    :iso =>'BVT',
    :lng  => -54.400322,
    :lat  => 3.487976
    },
    {
    :iso =>'BWA',
    :lng  => -17.780813,
    :lat  => 29.360781
    },
    {
    :iso =>'BLR',
    :lng  => 56.165806,
    :lat  => 32.770805
    },
    {
    :iso =>'BLZ',
    :lng  => 18.496557,
    :lat  => -87.776985
    },
    {
    :iso =>'CAN',
    :lng  => 83.110626,
    :lat  => -52.636291
    },
    {
    :iso =>'CCK',
    :lng  => -12.072459094,
    :lat  => 96.929489344
    },
    {
    :iso =>'COD',
    :lng  => 5.386098,
    :lat  => 31.305912
    },
    {
    :iso =>'CAF',
    :lng  => 11.007569,
    :lat  => 27.463421
    },
    {
    :iso =>'COG',
    :lng  => 3.703082,
    :lat  => 18.649839
    },
    {
    :iso =>'CHE',
    :lng  => 47.805332,
    :lat  => 10.491472
    },
    {
    :iso =>'CIV',
    :lng  => 10.736642,
    :lat  => -2.494897
    },
    {
    :iso =>'COK',
    :lng  => -10.023114,
    :lat  => -157.312134
    },
    {
    :iso =>'CHL',
    :lng  => -17.507553,
    :lat  => -66.417557
    },
    {
    :iso =>'CMR',
    :lng  => 13.078056,
    :lat  => 16.192116
    },
    {
    :iso =>'CHN',
    :lng  => 53.56086,
    :lat  => 134.773911
    },
    {
    :iso =>'COL',
    :lng  => 13.380502,
    :lat  => -66.869835
    },
    {
    :iso =>'CRI',
    :lng  => 11.216819,
    :lat  => -82.555992
    },
    {
    :iso =>'CUB',
    :lng  => 23.226042,
    :lat  => -74.131775
    },
    {
    :iso =>'CPV',
    :lng  => 17.197178,
    :lat  => -22.669443
    },
    {
    :iso =>'CUW',
    :lng  => 12.385672,
    :lat  => -68.733948
    },
    {
    :iso =>'CXR',
    :lng  => -10.412356007,
    :lat  => 105.712596992
    },
    {
    :iso =>'CYP',
    :lng  => 35.701527,
    :lat  => 34.59791599999994
    },
    {
    :iso =>'CZE',
    :lng  => 51.058887,
    :lat  => 18.860111
    },
    {
    :iso =>'DEU',
    :lng  => 55.055637,
    :lat  => 15.039889
    },
    {
    :iso =>'DJI',
    :lng  => 12.706833,
    :lat  => 43.416973
    },
    {
    :iso =>'DNK',
    :lng  => 57.748417,
    :lat  => 15.158834
    },
    {
    :iso =>'DMA',
    :lng  => 15.631809,
    :lat  => -61.244152
    },
    {
    :iso =>'DOM',
    :lng  => 19.929859,
    :lat  => -68.32
    },
    {
    :iso =>'DZA',
    :lng  => 37.093723,
    :lat  => 11.979548
    },
    {
    :iso =>'ECU',
    :lng  => 1.43902,
    :lat  => -75.184586
    },
    {
    :iso =>'EST',
    :lng  => 59.676224,
    :lat  => 28.209972
    },
    {
    :iso =>'EGY',
    :lng  => 31.667334,
    :lat  => 35.794861
    },
    {
    :iso =>'ESH',
    :lng  => 27.669674,
    :lat  => -8.670276
    },
    {
    :iso =>'ERI',
    :lng  => 18.003084,
    :lat  => 43.13464
    },
    {
    :iso =>'ESP',
    :lng  => 43.791721,
    :lat  => 4.315389
    },
    {
    :iso =>'ETH',
    :lng  => 14.89375,
    :lat  => 47.986179
    },
    {
    :iso =>'FIN',
    :lng  => 70.096054,
    :lat  => 31.580944
    },
    {
    :iso =>'FJI',
    :lng  => -12.480111,
    :lat  => -178.424438
    },
    {
    :iso =>'FLK',
    :lng  => -51.24065,
    :lat  => -57.712486
    },
    {
    :iso =>'FSM',
    :lng  => 10.08904,
    :lat  => 163.03717
    },
    {
    :iso =>'FRO',
    :lng  => 62.400749,
    :lat  => -6.399583
    },
    {
    :iso =>'FRA',
    :lng  => 51.092804,
    :lat  => 9.561556
    },
    {
    :iso =>'GAB',
    :lng  => 2.322612,
    :lat  => 14.502347
    },
    {
    :iso =>'GBR',
    :lng  => 59.360249,
    :lat  => 1.759
    },
    {
    :iso =>'GRD',
    :lng  => 12.318283928171299,
    :lat  => -61.57676970108031
    },
    {
    :iso =>'GEO',
    :lng  => 43.586498,
    :lat  => 46.725971
    },
    {
    :iso =>'GUF',
    :lng  => 5.776496,
    :lat  => -51.613949
    },
    {
    :iso =>'GGY',
    :lng  => 49.738609,
    :lat  => -2.163889
    },
    {
    :iso =>'GHA',
    :lng  => 11.173301,
    :lat  => 1.191781
    },
    {
    :iso =>'GIB',
    :lng  => 36.155439135670726,
    :lat  => -5.338285164001491
    },
    {
    :iso =>'GRL',
    :lng  => 83.627357,
    :lat  => -11.312319
    },
    {
    :iso =>'GMB',
    :lng  => 13.826571,
    :lat  => -13.797793
    },
    {
    :iso =>'GIN',
    :lng  => 12.67622,
    :lat  => -7.641071
    },
    {
    :iso =>'GLP',
    :lng  => 16.516848,
    :lat  => -61.0
    },
    {
    :iso =>'GNQ',
    :lng  => 2.346989,
    :lat  => 11.335724
    },
    {
    :iso =>'GRC',
    :lng  => 41.7484999849641,
    :lat  => 28.2470831714347
    },
    {
    :iso =>'SGS',
    :lng  => -53.970467,
    :lat  => -26.229326
    },
    {
    :iso =>'GTM',
    :lng  => 17.81522,
    :lat  => -88.223198
    },
    {
    :iso =>'GUM',
    :lng  => 13.652333,
    :lat  => 144.953979
    },
    {
    :iso =>'GNB',
    :lng  => 12.680789,
    :lat  => -13.636522
    },
    {
    :iso =>'GUY',
    :lng  => 8.557567,
    :lat  => -56.480251
    },
    {
    :iso =>'HKG',
    :lng  => 22.559778,
    :lat  => 114.434753
    },
    {
    :iso =>'HMD',
    :lng  => -52.909416,
    :lat  => 73.859146
    },
    {
    :iso =>'HND',
    :lng  => 16.510256,
    :lat  => -83.155403
    },
    {
    :iso =>'HRV',
    :lng  => 46.53875,
    :lat  => 19.427389
    },
    {
    :iso =>'HTI',
    :lng  => 20.08782,
    :lat  => -71.613358
    },
    {
    :iso =>'HUN',
    :lng  => 48.585667,
    :lat  => 22.906
    },
    {
    :iso =>'IDN',
    :lng  => 5.904417,
    :lat  => 141.021805
    },
    {
    :iso =>'IRL',
    :lng  => 55.387917,
    :lat  => -6.002389
    },
    {
    :iso =>'ISR',
    :lng  => 33.340137,
    :lat  => 35.876804
    },
    {
    :iso =>'IMN',
    :lng  => 54.419724,
    :lat  => -4.3115
    },
    {
    :iso =>'IND',
    :lng  => 35.504223,
    :lat  => 97.403305
    },
    {
    :iso =>'IOT',
    :lng  => -5.268333,
    :lat  => 72.493164
    },
    {
    :iso =>'IRQ',
    :lng  => 37.378029,
    :lat  => 48.575916
    },
    {
    :iso =>'IRN',
    :lng  => 39.777222,
    :lat  => 63.317471
    },
    {
    :iso =>'ISL',
    :lng  => 66.53463,
    :lat  => -13.495815
    },
    {
    :iso =>'ITA',
    :lng  => 47.095196,
    :lat  => 18.513445
    },
    {
    :iso =>'JEY',
    :lng  => 49.265057,
    :lat  => -2.022083
    },
    {
    :iso =>'JAM',
    :lng  => 18.526976,
    :lat  => -76.180321
    },
    {
    :iso =>'JOR',
    :lng  => 33.367668,
    :lat  => 39.301167
    },
    {
    :iso =>'JPN',
    :lng  => 45.52314,
    :lat  => 145.820892
    },
    {
    :iso =>'KEN',
    :lng  => 5.019938,
    :lat  => 41.899078
    },
    {
    :iso =>'KGZ',
    :lng  => 43.238224,
    :lat  => 80.283165
    },
    {
    :iso =>'KHM',
    :lng  => 14.686417,
    :lat  => 107.627724
    },
    {
    :iso =>'KIR',
    :lng  => 4.71957,
    :lat  => -150.215347
    },
    {
    :iso =>'COM',
    :lng  => -11.362381,
    :lat  => 44.538223
    },
    {
    :iso =>'KNA',
    :lng  => 17.420118,
    :lat  => -62.543266
    },
    {
    :iso =>'PRK',
    :lng  => 43.006054,
    :lat  => 130.674866
    },
    {
    :iso =>'KOR',
    :lng  => 38.612446,
    :lat  => 129.584671
    },
    {
    :iso =>'KWT',
    :lng  => 30.095945,
    :lat  => 48.431473
    },
    {
    :iso =>'CYM',
    :lng  => 19.7617,
    :lat  => -79.727272
    },
    {
    :iso =>'KAZ',
    :lng  => 55.451195,
    :lat  => 87.312668
    },
    {
    :iso =>'LAO',
    :lng  => 22.500389,
    :lat  => 107.697029
    },
    {
    :iso =>'LBN',
    :lng  => 34.691418,
    :lat  => 36.639194
    },
    {
    :iso =>'LCA',
    :lng  => 14.103245,
    :lat  => -60.874203
    },
    {
    :iso =>'LIE',
    :lng  => 47.273529,
    :lat  => 9.632195
    },
    {
    :iso =>'LKA',
    :lng  => 9.831361,
    :lat  => 81.881279
    },
    {
    :iso =>'LBR',
    :lng  => 8.551791,
    :lat  => -7.365113
    },
    {
    :iso =>'LSO',
    :lng  => -28.572058,
    :lat  => 29.465761
    },
    {
    :iso =>'LTU',
    :lng  => 56.446918,
    :lat  => 26.871944
    },
    {
    :iso =>'LUX',
    :lng  => 50.184944,
    :lat  => 6.528472
    },
    {
    :iso =>'LVA',
    :lng  => 58.082306,
    :lat  => 28.241167
    },
    {
    :iso =>'LBY',
    :lng  => 33.168999,
    :lat  => 25.150612
    },
    {
    :iso =>'MAR',
    :lng  => 35.9224966985384,
    :lat  => -0.991750000000025
    },
    {
    :iso =>'MCO',
    :lng  => 43.75196717037228,
    :lat  => 7.439939260482788
    },
    {
    :iso =>'MDA',
    :lng  => 48.490166,
    :lat  => 30.135445
    },
    {
    :iso =>'MNE',
    :lng  => 43.570137,
    :lat  => 20.358833
    },
    {
    :iso =>'MAF',
    :lng  => 18.130354,
    :lat  => -63.012993
    },
    {
    :iso =>'MDG',
    :lng  => -11.945433,
    :lat  => 50.48378
    },
    {
    :iso =>'MHL',
    :lng  => 14.62,
    :lat  => 171.931808
    },
    {
    :iso =>'MKD',
    :lng  => 42.361805,
    :lat  => 23.038139
    },
    {
    :iso =>'MLI',
    :lng  => 25.000002,
    :lat  => 4.244968
    },
    {
    :iso =>'MMR',
    :lng  => 28.543249,
    :lat  => 101.176781
    },
    {
    :iso =>'MNG',
    :lng  => 52.154251,
    :lat  => 119.924309
    },
    {
    :iso =>'MAC',
    :lng  => 22.222334,
    :lat  => 113.565834
    },
    {
    :iso =>'MNP',
    :lng  => 20.55344,
    :lat  => 146.06528
    },
    {
    :iso =>'MTQ',
    :lng  => 14.878819,
    :lat  => -60.81551
    },
    {
    :iso =>'MRT',
    :lng  => 27.298073,
    :lat  => -4.827674
    },
    {
    :iso =>'MSR',
    :lng  => 16.824060205313184,
    :lat  => -62.144100129608205
    },
    {
    :iso =>'MLT',
    :lng  => 36.079112527087844,
    :lat  => 14.577639
    },
    {
    :iso =>'MUS',
    :lng  => -10.319255,
    :lat  => 63.500179
    },
    {
    :iso =>'MDV',
    :lng  => 7.098361,
    :lat  => 73.637276
    },
    {
    :iso =>'MWI',
    :lng  => -9.367541,
    :lat  => 35.916821
    },
    {
    :iso =>'MEX',
    :lng  => 32.716759,
    :lat  => -86.703392
    },
    {
    :iso =>'MYS',
    :lng  => 7.363417,
    :lat  => 119.267502
    },
    {
    :iso =>'MOZ',
    :lng  => -10.471883,
    :lat  => 40.842995
    },
    {
    :iso =>'NAM',
    :lng  => -16.959894,
    :lat  => 25.256701
    },
    {
    :iso =>'NCL',
    :lng  => -19.549778,
    :lat  => 168.129135
    },
    {
    :iso =>'NER',
    :lng  => 23.525026,
    :lat  => 15.995643
    },
    {
    :iso =>'NFK',
    :lng  => -28.995170686948427,
    :lat  => 167.99773740209957
    },
    {
    :iso =>'NGA',
    :lng  => 13.892007,
    :lat  => 14.680073
    },
    {
    :iso =>'NIC',
    :lng  => 15.025909,
    :lat  => -82.738289
    },
    {
    :iso =>'NLD',
    :lng  => 53.512196,
    :lat  => 7.227944
    },
    {
    :iso =>'NOR',
    :lng  => 71.18811,
    :lat  => 31.078052520751953
    },
    {
    :iso =>'NPL',
    :lng  => 30.43339,
    :lat  => 88.199333
    },
    {
    :iso =>'NRU',
    :lng  => -0.504306,
    :lat  => 166.945282
    },
    {
    :iso =>'NIU',
    :lng  => -18.951069,
    :lat  => -169.775177
    },
    {
    :iso =>'NZL',
    :lng  => -34.389668,
    :lat  => -180.0
    },
    {
    :iso =>'OMN',
    :lng  => 26.387972,
    :lat  => 59.836582
    },
    {
    :iso =>'PAN',
    :lng  => 9.637514,
    :lat  => -77.17411
    },
    {
    :iso =>'PER',
    :lng  => -0.012977,
    :lat  => -68.677986
    },
    {
    :iso =>'PYF',
    :lng  => -7.903573,
    :lat  => -134.929825
    },
    {
    :iso =>'PNG',
    :lng  => -1.318639,
    :lat  => 155.96344
    },
    {
    :iso =>'PHL',
    :lng  => 21.120611,
    :lat  => 126.601524
    },
    {
    :iso =>'PAK',
    :lng  => 37.097,
    :lat  => 77.840919
    },
    {
    :iso =>'POL',
    :lng  => 54.839138,
    :lat  => 24.150749
    },
    {
    :iso =>'SPM',
    :lng  => 47.146286,
    :lat  => -56.252991
    },
    {
    :iso =>'PCN',
    :lng  => -24.315865,
    :lat  => -124.77285
    },
    {
    :iso =>'PRI',
    :lng  => 18.520166,
    :lat  => -65.242737
    },
    {
    :iso =>'PSE',
    :lng  => 32.54638671875,
    :lat  => 35.5732955932617
    },
    {
    :iso =>'PRT',
    :lng  => 42.145638,
    :lat  => -6.182694
    },
    {
    :iso =>'PLW',
    :lng  => 8.46966,
    :lat  => 134.72307
    },
    {
    :iso =>'PRY',
    :lng  => -19.294041,
    :lat  => -54.259354
    },
    {
    :iso =>'QAT',
    :lng  => 26.154722,
    :lat  => 51.636639
    },
    {
    :iso =>'REU',
    :lng  => -20.856855,
    :lat  => 55.845039
    },
    {
    :iso =>'ROU',
    :lng  => 48.266945,
    :lat  => 29.691055
    },
    {
    :iso =>'SRB',
    :lng  => 46.18138885498047,
    :lat  => 23.00499725341797
    },
    {
    :iso =>'RUS',
    :lng  => 81.857361,
    :lat  => -169.05
    },
    {
    :iso =>'RWA',
    :lng  => -1.053481,
    :lat  => 30.895958
    },
    {
    :iso =>'SAU',
    :lng  => 32.158333,
    :lat  => 55.666584
    },
    {
    :iso =>'SLB',
    :lng  => -6.589611,
    :lat  => 166.980865
    },
    {
    :iso =>'SYC',
    :lng  => -4.283717,
    :lat  => 56.279507
    },
    {
    :iso =>'SDN',
    :lng  => 22.232219696044922,
    :lat  => 38.60749816894531
    },
    {
    :iso =>'SWE',
    :lng  => 69.0625,
    :lat  => 24.156292483918484
    },
    {
    :iso =>'SGP',
    :lng  => 1.471278,
    :lat  => 104.007469
    },
    {
    :iso =>'SHN',
    :lng  => -7.887815,
    :lat  => -5.638753
    },
    {
    :iso =>'SVN',
    :lng  => 46.877918,
    :lat  => 16.566
    },
    {
    :iso =>'SJM',
    :lng  => 80.762085,
    :lat  => 33.287334
    },
    {
    :iso =>'SVK',
    :lng  => 49.603168,
    :lat  => 22.570444
    },
    {
    :iso =>'SLE',
    :lng  => 10.0,
    :lat  => -10.284238
    },
    {
    :iso =>'SMR',
    :lng  => 43.99223730851663,
    :lat  => 12.51653186779788
    },
    {
    :iso =>'SEN',
    :lng  => 16.691633,
    :lat  => -11.355887
    },
    {
    :iso =>'SOM',
    :lng  => 11.979166,
    :lat  => 51.412636
    },
    {
    :iso =>'SUR',
    :lng  => 6.004546,
    :lat  => -53.977493
    },
    {
    :iso =>'SSD',
    :lng  => 12.219148635864258,
    :lat  => 35.9405517578125
    },
    {
    :iso =>'STP',
    :lng  => 1.701323,
    :lat  => 7.466374
    },
    {
    :iso =>'SLV',
    :lng  => 14.445067,
    :lat  => -87.692162
    },
    {
    :iso =>'SXM',
    :lng  => 18.070248,
    :lat  => -63.012993
    },
    {
    :iso =>'SYR',
    :lng  => 37.319138,
    :lat  => 42.385029
    },
    {
    :iso =>'SWZ',
    :lng  => -25.719648,
    :lat  => 32.13726
    },
    {
    :iso =>'TCA',
    :lng  => 21.961878,
    :lat  => -71.123642
    },
    {
    :iso =>'TCD',
    :lng  => 23.450369,
    :lat  => 24.002661
    },
    {
    :iso =>'ATF',
    :lng  => -37.790722,
    :lat  => 77.598808
    },
    {
    :iso =>'TGO',
    :lng  => 11.138977,
    :lat  => 1.806693
    },
    {
    :iso =>'THA',
    :lng  => 20.463194,
    :lat  => 105.639389
    },
    {
    :iso =>'TJK',
    :lng  => 41.042252,
    :lat  => 75.137222
    },
    {
    :iso =>'TKL',
    :lng  => -8.553613662719727,
    :lat  => -171.21142578125
    },
    {
    :iso =>'TLS',
    :lng  => -8.135833740234375,
    :lat  => 127.30859375
    },
    {
    :iso =>'TKM',
    :lng  => 42.795555,
    :lat  => 66.684303
    },
    {
    :iso =>'TUN',
    :lng  => 37.543915,
    :lat  => 11.598278
    },
    {
    :iso =>'TON',
    :lng  => -15.562988,
    :lat  => -173.907578
    },
    {
    :iso =>'TUR',
    :lng  => 42.107613,
    :lat  => 44.834999
    },
    {
    :iso =>'TTO',
    :lng  => 11.338342,
    :lat  => -60.517933
    },
    {
    :iso =>'TUV',
    :lng  => -5.641972,
    :lat  => 179.863281
    },
    {
    :iso =>'TWN',
    :lng  => 25.29825,
    :lat  => 122.000443
    },
    {
    :iso =>'TZA',
    :lng  => -0.990736,
    :lat  => 40.443222
    },
    {
    :iso =>'UKR',
    :lng  => 52.369362,
    :lat  => 40.20739
    },
    {
    :iso =>'UGA',
    :lng  => 4.214427,
    :lat  => 35.036049
    },
    {
    :iso =>'UMI',
    :lng  => 28.219814,
    :lat  => 166.654526
    },
    {
    :iso =>'USA',
    :lng  => 49.388611,
    :lat  => -66.954811
    },
    {
    :iso =>'URY',
    :lng  => -30.082224,
    :lat  => -53.073933
    },
    {
    :iso =>'UZB',
    :lng  => 45.575001,
    :lat  => 73.132278
    },
    {
    :iso =>'VAT',
    :lng  => 41.90743830885576,
    :lat  => 12.45837546629481
    },
    {
    :iso =>'VCT',
    :lng  => 13.377834,
    :lat  => -61.11388
    },
    {
    :iso =>'VEN',
    :lng  => 12.201903,
    :lat  => -59.80378
    },
    {
    :iso =>'VGB',
    :lng  => 18.757221,
    :lat  => -64.268768
    },
    {
    :iso =>'VIR',
    :lng  => 18.391747,
    :lat  => -64.565178
    },
    {
    :iso =>'VNM',
    :lng  => 23.388834,
    :lat  => 109.464638
    },
    {
    :iso =>'VUT',
    :lng  => -13.073444,
    :lat  => 169.904785
    },
    {
    :iso =>'WLF',
    :lng  => -13.214251,
    :lat  => -176.128784
    },
    {
    :iso =>'WSM',
    :lng  => -13.432207,
    :lat  => -171.415741
    },
    {
    :iso =>'XKX',
    :lng  => 43.2682495807952,
    :lat  => 21.80335088694943
    },
    {
    :iso =>'YEM',
    :lng  => 18.9999989031009,
    :lat  => 54.5305388163283
    },
    {
    :iso =>'MYT',
    :lng  => -12.648891,
    :lat  => 45.29295
    },
    {
    :iso =>'ZAF',
    :lng  => -22.126612,
    :lat  => 32.895973
    },
    {
    :iso =>'ZMB',
    :lng  => -8.22436,
    :lat  => 33.705704
    },
    {
    :iso =>'ZWE',
    :lng  => -15.608835,
    :lat  => 33.056305
    }]

  positions.each do |position|
    Operation.where(:iso => position[:iso]).update_all("lng = #{position[:lng]}, lat = #{position[:lat]}")
  end


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