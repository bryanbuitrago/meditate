import { getMeditationByID } from "@/app/actions/meditation/meditationActions";



type MeditationType = {
    meditationID: string
}


async function SingleMeditation({ params } : { params: MeditationType }) {

const meditation = await getMeditationByID(params)

console.log(meditation)

    return (
        <div>
            Single Meditation Page
            <h1>time: {meditation?.time}</h1>
            <p>Started at: {meditation?.startDateTime.toISOString()}</p>
        </div>
    );
}

export default SingleMeditation;