import { getMeditationByID } from "@/app/actions/meditation/meditationActions";
import SingleMeditation from "@/app/components/meditation/SingleMeditation";




type MeditationType = {
    meditationID: string
}


async function SingleMeditationPage({ params } : { params: MeditationType }) {

const meditation = await getMeditationByID(params)

console.log(meditation)

    return (
        <SingleMeditation meditation={meditation} />
        // === Version 1.0 ===
        // <div>
        //     Single Meditation Page
        //     <h1>time: {formatDuration(meditation?.time)}</h1>
        //     <p>Started at: {meditation?.startDateTime.toISOString()}</p>
        // </div>
    );
}

export default SingleMeditationPage;