import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useGetCabin } from "./useGetCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  const { isLoading, cabins } = useGetCabin();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner></Spinner>;

  //1.filter
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;

  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  //2.sort
  const sortByValue = searchParams.get("sortBy") || "startDate-asc";

  const [field, direction] = sortByValue.split("-");

  console.log(field, direction);
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabin = filteredCabins.sort((a, b) => {
    if (typeof a[field] === "string" && typeof b[field] === "string") {
      return a[field].localeCompare(b[field]) * modifier;
    }
    return (a[field] - b[field]) * modifier;
  });
  console.log(modifier, sortedCabin);

  return (
    <Menus>
      <Table columns="0.8fr 2fr 2.2fr 1fr 1fr 0.2fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabin}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id}></CabinRow>}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
