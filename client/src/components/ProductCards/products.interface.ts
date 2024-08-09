export interface BaseProduct {
  id: string;
  title: string;
  availableInStock: number;
  description: string;
  price: number;
  slug: string;
  image?: string;
  brand: string;
  category: string;
}

export interface GraphicsCard extends BaseProduct {
  ramSizeGb: number;
  memorySpeedMhz: number;
  gpuClockSpeedMhz: number;
  cardInterface: string;
  maxScreenResolution: string;
  requiredPowerSupply: number;
}

export interface CPU extends BaseProduct {
  clockFrequencyGhz: number;
  turboClockFrequencyGhz: number;
  supportedRamFrequencyMhz: number;
  isBoxedVersion: boolean;
  socket: string;
  tdpWatt: number;
  l3CacheMb: number;
  l2CacheMb: number;
  numberOfCores: number;
  numberOfThreads: number;
  techprocessInNm: number;
}

export interface SSD extends BaseProduct {
  hasHeatsink: boolean;
  flashChipType: string;
  sequentialWriteSpeedMbInSec: number;
  sequentialReadSpeedMbInSec: number;
  interfaceType: string;
  isCompatibleWithPs5: boolean;
  volumeInGb: number;
  formFactor: string;
}

export interface HDD extends BaseProduct {
  shockResistanceDuringStorageG: number;
  shockResistanceDuringOperationG: number;
  rotationalSpeedRpm: number;
  noiseLevelDb: number;
  bufferVolumeMb: number;
  mtbfHours: number;
  volumeInGb: number;
  formFactor: string;
}

export interface PSU extends BaseProduct {
  maximumCurrentAlongThePlus12vLine: number;
  hasCpu8Pin: boolean;
  hasCpu4Pin: boolean;
  hasPcie8Pin: boolean;
  hasPcie6Pin: boolean;
  numberOfSeparate12vLines: number;
  maxInputVoltageRage: number;
  minInputVoltageRage: number;
  isModular: boolean;
  fanDiameterInMm: number;
  powerW: number;
}

export interface RAM extends BaseProduct {
  ranksNumber?: number;
  volumeInGb: number;
  hasHeatsink: boolean;
  cl: number;
  modulesNumber?: number;
  timings: string;
  clockFrequencyMhz: number;
}

export interface Motherboard extends BaseProduct {
  hasLiquidCoolingConnector: boolean;
  processorManufacturer: string;
  socket: string;
  chipset: string;
  isDualChannel: boolean;
  isFourChannel: boolean;
  maxMemoryFrequencyMhz: number;
  memoryType: string;
  maxMemoryCapacityGb: number;
  ramSlotsNumber: number;
}

export interface Cooling extends BaseProduct {
  supportedSockets: string[];
  connectorTypePin: number;
  fansNumber: number;
  heatPipeNumber: number;
  dbMaxNoiseLevel: number;
  fanDiameterMm: number;
  maxPowerDissipationW: number;
}

export interface Case extends BaseProduct {
  slots2dot5Number: number;
  maxCpuCoolerLengthMm: number;
  maxGpuLengthMm: number;
  color: string;
  material: string;
}
