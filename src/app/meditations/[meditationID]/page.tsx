import { getMeditationByID } from "@/app/actions/meditation/meditationActions";
import SingleMeditation from "@/app/components/meditation/SingleMeditation";

type ParamsMeditationID = {
    meditationID: string
}

type Meditation = {
    time: number
    startDateTime: Date
    createdAt: Date
}


async function SingleMeditationPage({ params } : { params: ParamsMeditationID }) {

    const meditation: Meditation | null = await getMeditationByID(params)

    if(!meditation) {
        return <div>Loading or error message... </div>
    
    }

    // Format startDateTime Date object to a string
    const startDateTimeStringFormat = meditation.startDateTime.toISOString()

    // Format createdAt Date object to a string
    const createdAtStringFormat = meditation.createdAt.toISOString()

    return (
        <SingleMeditation 
            time={meditation.time}
            startDateTime={startDateTimeStringFormat}
            createdAt={createdAtStringFormat}
        />
    );
}

export default SingleMeditationPage;