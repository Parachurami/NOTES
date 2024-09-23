import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import CustomDrawerContent from "../components/CustomDrawerContent";
import PrimaryButton from "../components/PrimaryButton";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/CustomDrawerContent">
                <CustomDrawerContent/>
            </ComponentPreview>
            <ComponentPreview path="/PrimaryButton">
                <PrimaryButton/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews