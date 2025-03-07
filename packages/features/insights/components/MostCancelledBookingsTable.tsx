import { Title } from "@tremor/react";

import { useLocale } from "@calcom/lib/hooks/useLocale";
import { trpc } from "@calcom/trpc";

import { useInsightsParameters } from "../hooks/useInsightsParameters";
import { CardInsights } from "./Card";
import { LoadingInsight } from "./LoadingInsights";
import { TotalBookingUsersTable } from "./TotalBookingUsersTable";

export const MostCancelledBookingsTable = () => {
  const { t } = useLocale();
  const { isAll, teamId, startDate, endDate, eventTypeId } = useInsightsParameters();

  const { data, isSuccess, isPending } = trpc.viewer.insights.membersWithMostCancellations.useQuery(
    {
      startDate,
      endDate,
      teamId,
      eventTypeId,
      isAll,
    },
    {
      staleTime: 30000,
      trpc: {
        context: { skipBatch: true },
      },
    }
  );

  if (isPending) return <LoadingInsight />;

  if (!isSuccess || !data) return null;

  return (
    <CardInsights className="shadow-none">
      <Title className="text-emphasis">{t("most_cancelled_bookings")}</Title>
      <TotalBookingUsersTable data={data} />
    </CardInsights>
  );
};

export default MostCancelledBookingsTable;
