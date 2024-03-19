import './AddCharacterPage.scss';
import InvestigatorBackgroundForm from '../../components/InvestigatorBackgroundForm/InvestigatorBackgroundForm.jsx';
import InvestigatorDetailsForm from '../../components/InvestigatorDetailsForm/InvestigatorDetailsForm.jsx';
import InvestigatorExtrasForm from '../../components/InvestigatorExtrasForm/InvestigatorExtrasForm.jsx';
import InvestigatorSkillsForm from '../../components/InvestigatorSkillsForm/InvestigatorSkillsForm.jsx';
import InvestigatorStatsForm from '../../components/InvestigatorStatsForm/InvestigatorStatsForm.jsx';

function AddCharacterPage() {
    
    return (
        <section>
            <div>Add Character Page</div>
            <InvestigatorBackgroundForm />
            <InvestigatorDetailsForm />
            <InvestigatorSkillsForm />
            <InvestigatorStatsForm />
            <InvestigatorExtrasForm />
        </section>
    );
    }

export default AddCharacterPage;