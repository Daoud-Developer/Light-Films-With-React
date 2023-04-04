import FilterBy from "./FilterBy";
import SortBy from "./SortBy";
const ExploreFilter = ({ currentTab, }) => {
    return (<>
      <SortBy />
      <FilterBy currentTab={currentTab}/>
    </>);
};
export default ExploreFilter;
