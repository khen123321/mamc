import { hospitalFloors } from "@/lib/mock/map";

export const mapService = {
  getFloors: () => hospitalFloors,
  getLocations: () => hospitalFloors.flatMap((floor) => floor.locations),
  getLocationById: (locationId: string) => hospitalFloors.flatMap((floor) => floor.locations).find((location) => location.locationId === locationId),
};
