import { useSearchParams } from 'react-router-dom';

export function useSearchParametersState<T extends string>(
  searchParameterName: string,
  defaultValue: T
): readonly [
  searchParamsState: string,
  setSearchParamsState: (newState: T) => void
] {
  const [searchParameters, setSearchParameters] = useSearchParams();

  const acquiredSearchParameter = searchParameters.get(searchParameterName);
  const searchParametersState = acquiredSearchParameter ?? defaultValue;

  const setSearchParametersState = (newState: T) => {
    const next = {
      ...Object.fromEntries(
        [...searchParameters.entries()].map(([key, value]) => [key, value])
      ),
      [searchParameterName]: newState,
    };
    setSearchParameters(next);
  };
  return [searchParametersState, setSearchParametersState];
}
