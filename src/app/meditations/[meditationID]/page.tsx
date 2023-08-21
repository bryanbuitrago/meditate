import { getMeditationByID } from "@/app/actions/meditation/meditationActions";
import SingleMeditation from "@/app/components/meditation/SingleMeditation";

type ParamsMeditationID = {
    meditationID: string
}


async function SingleMeditationPage({ params } : { params: ParamsMeditationID }) {

const meditation = await getMeditationByID(params)

console.log(meditation)

    return (
        <SingleMeditation meditation={meditation} />
    );
}

export default SingleMeditationPage;