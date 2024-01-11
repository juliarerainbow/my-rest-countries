// import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

function CountriesList() {
    const [selectedSubRegion, setSelectedSubRegion] = useState(null);
    const subRegions = [
        { name: 'Western Europe', code: 'Western Europe' },
        { name: 'Southern Europe', code: 'Southern Europe' },
        { name: 'Eastern Europe', code: 'Eastern Europe' },
        { name: 'Central Europe', code: 'Central Europe' },
    ];

    const [incData, setIncData] = useState<any>();
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        capital: { value: null, matchMode: FilterMatchMode.IN },
        subregion: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`https://restcountries.com/v3.1/region/europe`);
          const newData = await response.json();
          let result = newData.map(function(obj:any) {
            return {
                name: obj.name.common,
                flag: obj.flag,
                capital: obj.capital[0],
                subregion:obj.subregion
            }
            });
            setIncData(result)
        };
        fetchData();
      },[]);

      const customBodyTemplate = (rowData:any, column:any) => {
        const customStyle = {
            fontSize:'30px'
        };
    
        return (
          <div style={customStyle}>
            {rowData[column.field]}
          </div>
        );
      };

      const handleDropdownChange = (e:any) => {
        const selectedSubRegionName = e.value.name;
        let allData = [...incData];
        const filteredData = allData.filter((item) => item.subregion === selectedSubRegionName);
        const remainingData = allData.filter((item) => item.subregion !== selectedSubRegionName);
        const organizedData = [...filteredData, ...remainingData];
        setIncData(organizedData);
        setSelectedSubRegion(e.value);
      };

      const onGlobalFilterChange = (e:any) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left" style={{marginRight:"30px"}}>
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Cerca" />
                </span>
                <span>

            <Dropdown value={selectedSubRegion} onChange={handleDropdownChange} options={subRegions} optionLabel="name" 
                placeholder="Seleziona una Sotto Regione" className="w-full md:w-14rem" />
                </span>
            </div>
        );
    };

    const header = renderHeader();

    return (

        <div className="flex mt-4">
            <DataTable filters={filters} filterDisplay="row"  globalFilterFields={['name', 'capital', 'subregion']} value={incData} paginator rows={8} header={header} tableStyle={{ minWidth: '60rem' }} >
            <Column field="flag"  header="Bandiere" body={customBodyTemplate} style={{ width: '10%' }}></Column>
            <Column field="name" filterField="name" header="Paesi" sortable style={{ width: '25%' }}></Column>
                <Column field="capital" filterField="capital" header="Capitali" sortable style={{ width: '25%' }}></Column>
                <Column field="subregion" filterField="subregion" header="Sottoregioni" sortable style={{ width: '25%' }}></Column>
            </DataTable>
        </div>
    );
}

export default CountriesList;