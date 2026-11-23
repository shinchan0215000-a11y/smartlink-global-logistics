import heroCargoShipImg from '../assets/images/hero_cargo_ship_1795421954019.jpg';
import portCranesTerminalImg from '../assets/images/port_cranes_terminal_1795421954349.jpg';
import airFreightCargoImg from '../assets/images/air_freight_cargo_1795421954424.jpg';
import highwayFreightTruckImg from '../assets/images/highway_freight_truck_1795421954130.jpg';
import warehouseCargoOpsImg from '../assets/images/warehouse_cargo_ops_1795421954255.jpg';

export interface VideoClip {
  videoUrl: string;
  mobileVideoUrl: string;
  fallbackImage: string;
  alt: string;
}

export interface ServiceDivision {
  id: string;
  code: string;
  group?: 'transportation';
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  note?: string;
  video: VideoClip;
}

export interface ContactChannel {
  label: string;
  number: string;
  href: string;
  description: string;
}

export interface TradeCorridor {
  id: string;
  name: string;
  region: string;
  mode: string;
  svgX: number;
  svgY: number;
  summary: string;
}

export const COMPANY_INFO = {
  name: 'SmartLink Global Logistics',
  shortName: 'SmartLink',
  tagline: 'Connecting Businesses Through Global Logistics.',
  managingPartner: 'Mr. B. Balamurugan',
  licenseNumber: 'R-247/13',
  licenseAuthority: 'Chennai Customs',
  licenseVerificationNote:
    'Note: Verify that Customs House Agency License No. R-247/13 (issued by Chennai Customs) is current before final publication.',
  addressLines: [
    'Old No.64, New No.129, 4th Floor,',
    'Thambu Chetty Street, Parrys,',
    'Chennai – 600001, India.',
  ],
  fullAddress:
    'Old No.64, New No.129, 4th Floor, Thambu Chetty Street, Parrys, Chennai – 600001, India.',
  email: 'info@smartlinkglobal.in',
  chennaiCoords: { lat: 13.0897, lng: 80.2896 },
  externalMapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Old+No.64+New+No.129+Thambu+Chetty+Street+Parrys+Chennai+600001+India',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=13.0897,80.2896',
  embedMapUrl:
    'https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s13.0897,80.2896!6i16',
  videoDisclaimer:
    'Video footage illustrates international shipping, air cargo, road haulage, and warehouse logistics modes supported by SmartLink Global Logistics and does not depict company-owned vessels, aircraft, or vehicles.',
};

export const VIDEO_CLIPS: Record<string, VideoClip> = {
  oceanTerminal: {
    videoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/transcoded/0/0f/Aerial_views_at_night_of_Cork_Container_Terminal_%28CCT%29_in_Ringaskiddy%2C_County_Cork%2C_Ireland.webm/Aerial_views_at_night_of_Cork_Container_Terminal_%28CCT%29_in_Ringaskiddy%2C_County_Cork%2C_Ireland.webm.720p.vp9.webm',
    mobileVideoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/transcoded/0/0f/Aerial_views_at_night_of_Cork_Container_Terminal_%28CCT%29_in_Ringaskiddy%2C_County_Cork%2C_Ireland.webm/Aerial_views_at_night_of_Cork_Container_Terminal_%28CCT%29_in_Ringaskiddy%2C_County_Cork%2C_Ireland.webm.480p.vp9.webm',
    fallbackImage: heroCargoShipImg,
    alt: 'Illuminated international maritime container terminal and quay cranes at night',
  },
  portVessels: {
    videoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/f/f5/MSC_Paris_-_berthing_at_BCT_Gdynia%2C_Timelapse..webm',
    mobileVideoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f5/MSC_Paris_-_berthing_at_BCT_Gdynia%2C_Timelapse..webm/MSC_Paris_-_berthing_at_BCT_Gdynia%2C_Timelapse..webm.480p.vp9.webm',
    fallbackImage: portCranesTerminalImg,
    alt: 'Ocean container vessel berthing alongside deepwater port gantry cranes',
  },
  portCranes: {
    videoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/8/82/20201119-TFAA-LSC-0045-CLIP.webm',
    mobileVideoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/transcoded/8/82/20201119-TFAA-LSC-0045-CLIP.webm/20201119-TFAA-LSC-0045-CLIP.webm.480p.vp9.webm',
    fallbackImage: portCranesTerminalImg,
    alt: 'Port gantry cranes handling international shipping containers',
  },
  containerLoading: {
    videoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/6/61/Container_reach_stacker%2C_Port_of_Rauma.webm',
    mobileVideoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/transcoded/6/61/Container_reach_stacker%2C_Port_of_Rauma.webm/Container_reach_stacker%2C_Port_of_Rauma.webm.480p.vp9.webm',
    fallbackImage: portCranesTerminalImg,
    alt: 'Reach stacker loading shipping containers onto road container trailers at port terminal',
  },
  airFreight: {
    videoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d0/Plane_Spotting_Emirates_CARGO_Runway_and_Close_up_at_RCTP_with_ATC.webm/Plane_Spotting_Emirates_CARGO_Runway_and_Close_up_at_RCTP_with_ATC.webm.720p.vp9.webm',
    mobileVideoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/transcoded/d/d0/Plane_Spotting_Emirates_CARGO_Runway_and_Close_up_at_RCTP_with_ATC.webm/Plane_Spotting_Emirates_CARGO_Runway_and_Close_up_at_RCTP_with_ATC.webm.480p.vp9.webm',
    fallbackImage: airFreightCargoImg,
    alt: 'Dedicated widebody cargo freighter aircraft operating on international airport runway',
  },
  highwayTrucks: {
    videoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/7/75/Motorway_A40_-_on_bridge_above_the_traffic.webm',
    mobileVideoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/transcoded/7/75/Motorway_A40_-_on_bridge_above_the_traffic.webm/Motorway_A40_-_on_bridge_above_the_traffic.webm.480p.vp9.webm',
    fallbackImage: highwayFreightTruckImg,
    alt: 'Commercial freight trucks moving along an express highway corridor',
  },
  warehouseDocks: {
    videoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/7/75/Amazon_warehouse_BHX4_loading_docks_1.webm',
    mobileVideoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/transcoded/7/75/Amazon_warehouse_BHX4_loading_docks_1.webm/Amazon_warehouse_BHX4_loading_docks_1.webm.480p.vp9.webm',
    fallbackImage: warehouseCargoOpsImg,
    alt: 'Articulated cargo trailers docked at warehouse loading bays',
  },
  warehouseInterior: {
    videoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/0/05/Amazon_warehouse_BHX4_loading_docks_2.webm',
    mobileVideoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/transcoded/0/05/Amazon_warehouse_BHX4_loading_docks_2.webm/Amazon_warehouse_BHX4_loading_docks_2.webm.480p.vp9.webm',
    fallbackImage: warehouseCargoOpsImg,
    alt: 'Warehouse loading dock and palletized freight staging operations',
  },
  shippingChannel: {
    videoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/8/83/20201119-TFAA-LSC-0144-CLIP.webm',
    mobileVideoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/transcoded/8/83/20201119-TFAA-LSC-0144-CLIP.webm/20201119-TFAA-LSC-0144-CLIP.webm.480p.vp9.webm',
    fallbackImage: heroCargoShipImg,
    alt: 'Container vessels operating across international maritime waters',
  },
};

export const HERO_SEQUENCE: VideoClip[] = [
  VIDEO_CLIPS.oceanTerminal,
  VIDEO_CLIPS.portVessels,
  VIDEO_CLIPS.airFreight,
];

export const ABOUT_CONTENT = {
  lead: 'SmartLink Global Logistics is an Indian Customs Brokerage Agency providing Customs Clearance, Transportation, Freight Forwarding and Integrated Logistics solutions.',
  summary:
    'We support import and export consignments end-to-end — from initial documentation review and customs filing through shipment clearance, inland transportation, and final delivery.',
  operationalPoints: [
    'Customs clearance for import and export shipments across sea, air, and land gateways',
    'Structured documentation management and coordination with customs authorities',
    'Support for consignments from initial paperwork through customs handling, transport, and delivery',
    'Dedicated focus on understanding client requirements, business operations, and commodities imported or exported',
    'Professional coordination with customs departments, shipping lines, airlines, and associated regulatory agencies',
  ],
  commitments: [
    {
      index: '01',
      title: 'Personalized Service',
      detail: 'Tailored shipment coordination built around each client’s specific cargo profile and schedules.',
    },
    {
      index: '02',
      title: 'Honest Communication',
      detail: 'Transparent regulatory updates, clear status visibility, and straightforward guidance.',
    },
    {
      index: '03',
      title: 'Efficient Handling',
      detail: 'Disciplined documentation verification and timely coordination across ports, airports, and ICDs.',
    },
    {
      index: '04',
      title: 'Long-Term Relationships',
      detail: 'Consistent operational accountability focused on lasting commercial partnerships.',
    },
  ],
};

export const SERVICES_LIST: ServiceDivision[] = [
  {
    id: 'customs-brokerage',
    code: '01',
    title: 'Customs Brokerage',
    subtitle: 'Import, Export, Sea & Air Customs Clearance',
    description:
      'Licensed Indian customs brokerage focused on accurate documentation, tariff and scheme compliance, bonded warehouse formalities, and timely cargo clearance.',
    items: [
      'Import and Export Customs Clearance',
      'Sea Customs Clearance',
      'Air Customs Clearance',
      'Customs documentation and coordination',
      'Bonding and debonding of imported cargo in customs bonded warehouses',
      'Customs claim agent work',
      'Support for 100% EOU, EPCG, OGL and Project Import schemes',
    ],
    video: VIDEO_CLIPS.portCranes,
  },
  {
    id: 'freight-forwarding',
    code: '02',
    title: 'Freight Forwarding',
    subtitle: 'International Air & Ocean Shipment Coordination',
    description:
      'International freight forwarding connecting Indian importers and exporters with global trade lanes through structured air and ocean shipment coordination, carrier scheduling, and shipping documentation alignment.',
    items: [
      'International air and ocean freight forwarding coordination',
      'Carrier booking, space coordination, and transit schedule monitoring',
      'Airway bill, bill of lading, and pre-shipment documentation alignment',
      'Door-to-port, port-to-port, and door-to-door consignment planning',
    ],
    video: VIDEO_CLIPS.shippingChannel,
  },
  {
    id: 'air-transportation',
    code: '03',
    group: 'transportation',
    title: 'Air Transportation',
    subtitle: 'Direct, Consolidated & Charter Air Cargo',
    description:
      'Time-sensitive international air freight solutions coordinated with airlines, ground handlers, and overseas agents from pickup through airport clearance and final delivery.',
    items: [
      'Direct air freight',
      'Consolidation services',
      'Full and partial charter support, subject to availability',
      'Coordination with carriers, airline schedules, and overseas agents',
      'Pickup-to-destination handling',
    ],
    video: VIDEO_CLIPS.airFreight,
  },
  {
    id: 'ocean-transportation',
    code: '04',
    group: 'transportation',
    title: 'Ocean Transportation',
    subtitle: 'FCL, LCL & Project Sea Freight',
    description:
      'End-to-end international ocean freight movement across container, consolidated, and heavy project shipments backed by proactive shipping line coordination.',
    items: [
      'Full Container Load (FCL)',
      'Less than Container Load (LCL)',
      'Project shipments',
      'Shipping line and carrier coordination',
      'International ocean movement',
    ],
    video: VIDEO_CLIPS.oceanTerminal,
  },
  {
    id: 'road-transportation',
    code: '05',
    group: 'transportation',
    title: 'Road Transportation',
    subtitle: 'India-Wide Container, General & ODC Haulage',
    description:
      'Reliable inland road freight across India linking seaports, air cargo terminals, ICDs, warehouses, and manufacturing facilities with safe handling oversight.',
    items: [
      'India-wide container transport',
      'General cargo movement',
      'Heavy and over-dimensional cargo',
      'Safe handling and inland delivery coordination',
    ],
    video: VIDEO_CLIPS.highwayTrucks,
  },
  {
    id: 'sez-mepz',
    code: '06',
    title: 'SEZ / MEPZ Activities',
    subtitle: 'Special Economic Zone & MEPZ Compliance',
    description:
      'Dedicated procedural execution and documentation support for Special Economic Zone and MEPZ units covering setup, DTA sourcing, software exports, and exit compliance.',
    items: [
      'New SEZ unit formation',
      'SOFTEX filing',
      'DTA procurement with export benefits',
      'Form A1 / A2 / I',
      'SEZ unit exit formalities',
    ],
    video: VIDEO_CLIPS.containerLoading,
  },
  {
    id: 'svb-services',
    code: '07',
    title: 'SVB Services',
    subtitle: 'Special Valuation Branch Advisory & Filings',
    description:
      'Structured advisory and representation support for importers involved in related-party cross-border transactions subject to Special Valuation Branch review.',
    items: [
      'SVB registration for related-party transactions',
      'Questionnaire guidance',
      'Document preparation & submission',
      'Renewal of SVB orders',
      'Finalization & obtaining SVB orders',
    ],
    video: VIDEO_CLIPS.warehouseInterior,
  },
  {
    id: 'value-added-services',
    code: '08',
    title: 'Value Added Services',
    subtitle: 'DGFT Licensing, Refunds, Permits & Cargo Packing',
    description:
      'Integrated trade facilitation spanning DGFT matters, customs duty refunds, chartered engineering valuation, quarantine and fumigation clearances, cargo insurance, and export packing.',
    items: [
      'DGFT matters',
      'IEC assistance',
      'License processing / modifications',
      'SAD & customs duty refund support',
      'Chartered engineering & goods valuation',
      'Insurance coordination',
      'Quarantine permits',
      'Fumigation arrangements',
      'Palletizing & shrink-wrapping',
      'Advance Authorization',
      'EPCG license support',
      'Status Holder Certificates',
      'MEIS / SEIS license support',
      'Import and Export certificates',
    ],
    video: VIDEO_CLIPS.warehouseDocks,
  },
];

// Coordinates projected onto 800x400 equirectangular SVG schematic
export const CHENNAI_MAP_POINT = { x: 578, y: 171 };

export const TRADE_CORRIDORS: TradeCorridor[] = [
  {
    id: 'asia-pacific',
    name: 'East & Southeast Asia Corridor',
    region: 'Asia-Pacific Maritime & Air Lanes',
    mode: 'Ocean FCL / LCL · Air Freight',
    svgX: 631,
    svgY: 197,
    summary: 'Connecting Indian ports and air gateways with East and Southeast Asian manufacturing hubs.',
  },
  {
    id: 'east-asia',
    name: 'Northeast Asia Industrial Lane',
    region: 'Northeast Asia Trade Corridor',
    mode: 'Ocean Container · Project Cargo',
    svgX: 670,
    svgY: 131,
    summary: 'Supporting raw material imports, electronics, and capital equipment clearances.',
  },
  {
    id: 'gulf-mena',
    name: 'Middle East & Red Sea Gateway',
    region: 'Gulf & West Asia Corridor',
    mode: 'Ocean Freight · Express Air',
    svgX: 523,
    svgY: 144,
    summary: 'Transshipment and direct maritime & air cargo links across Gulf trade gateways.',
  },
  {
    id: 'europe',
    name: 'European Maritime & Air Route',
    region: 'Northern & Mediterranean Europe',
    mode: 'Sea Freight · Air Freight · SVB',
    svgX: 410,
    svgY: 85,
    summary: 'Structured customs documentation and freight coordination for European trade flows.',
  },
  {
    id: 'americas',
    name: 'Trans-Atlantic & Americas Route',
    region: 'North & South America Trade Lanes',
    mode: 'Ocean FCL / LCL · Air Cargo',
    svgX: 235,
    svgY: 110,
    summary: 'Long-haul import and export coordination supported by DGFT and customs advisory.',
  },
];

export const CUSTOMER_SECTORS = [
  {
    code: '01',
    title: 'Industrial Machinery & Project Imports',
    scope: 'Heavy and over-dimensional cargo transport, EPCG authorization coordination, and project shipment clearance.',
  },
  {
    code: '02',
    title: 'SEZ & MEPZ Export Enterprises',
    scope: 'Unit formation compliance, SOFTEX filings, DTA procurement with export benefits, Form A1/A2/I, and exit formalities.',
  },
  {
    code: '03',
    title: 'Related-Party & Multinational Importers',
    scope: 'Special Valuation Branch (SVB) registration, questionnaire guidance, document submission, renewal, and order finalization.',
  },
  {
    code: '04',
    title: 'Manufacturing, General Cargo & Exporters',
    scope: 'FCL/LCL ocean forwarding, air cargo, palletizing, shrink-wrapping, fumigation, quarantine permits, and customs duty refunds.',
  },
];

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    label: 'Office Telephone',
    number: '+91 44 4203 6894',
    href: 'tel:+914442036894',
    description: 'Chennai Head Office Reception & Administration',
  },
  {
    label: 'Business Enquiry',
    number: '+91 98418 96000',
    href: 'tel:+919841896000',
    description: 'New Client Onboarding & Commercial Quotes',
  },
  {
    label: 'Business & Customs Related Enquiry',
    number: '+91 90430 08430',
    href: 'tel:+919043008430',
    description: 'Customs Brokerage, SEZ / MEPZ & SVB Documentation',
  },
  {
    label: 'Transport & Fleet Operations',
    number: '+91 70928 01000',
    href: 'tel:+917092801000',
    description: 'Container Haulage, Heavy & General Cargo Dispatch',
  },
];
