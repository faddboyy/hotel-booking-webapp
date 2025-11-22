import { Prisma } from "@prisma/client";

export type RoomProps = Prisma.RoomGetPayload<{
  include: { RoomAmenities: { select: { amenitiesId: true } } };
}>;

export type RoomDetailProps = Prisma.RoomGetPayload<{
  include: {
    RoomAmenities: {
      include: {
        amenities: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;

export type DisabledDateProps = Prisma.ReservationGetPayload<{
  select: {
    startDate: true;
    endDate: true;
  };
}>;
