import { Input, Link, Text, InputType, TextArea ,Select,Option} from "@ui5/webcomponents-react";
const StandardField = ({ editMode, value, inputType = InputType.None, onChange, selectOptions, ...rest }) => {
  if (editMode) {
    if (inputType === "TextArea") {
      return <TextArea value={value} style={{ width: '100%' }} type={inputType} onChange={onChange}  {...rest} />;
    }

    if (inputType === "Select") {
      return (
        <Select selectOptions={selectOptions || []} onChange={onChange} {...rest}>
           {selectOptions && selectOptions.map(item=>{
            return ( <Option>
              {item}
            </Option>);
           })}
        </Select>
      )
    }

    return <Input value={value} style={{ width: '100%' }} type={inputType} onChange={onChange} {...rest} />;
  }
  if (inputType === InputType.URL || inputType === InputType.Email) {
    return (
      <Link href={inputType === InputType.Email ? `mailto:${value}` : value} target="_blank" {...rest}>
        {value}
      </Link>
    );
  }
 
  return <Text {...rest}>{value}</Text>;
};
export default StandardField;