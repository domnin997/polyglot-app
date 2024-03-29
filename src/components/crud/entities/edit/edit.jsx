import { PageLayoutContext } from '../../../../context/layoutContext'
import { createPortal } from 'react-dom'
import {
  useState,
  useContext,
  useEffect
} from 'react'
import { useNavigate } from 'react-router'
import StandardButton from '../../../standardButton/standardButton'
import './edit.css'
import LoadingSign from '../../../loader/loadingSign'
import { getDateInputFormat } from '../../../../utils/getDate'

export default function EditEntity ({
  entityConfig,
  entityId,
  entitySave,
  entityQuery,
  queryParams,
  isMutationLoading
}) {
  
  const navigate = useNavigate()
  const { 
    data, 
    isLoading 
  } = entityQuery(queryParams, {
    skip: entityId === null,
  })
  const {
    headerLeftElement,
    headerRightElement
  } = useContext(PageLayoutContext);
  async function handleSubmit () {
    await entitySave(values)
    navigate(-1)
  }
  const [values, setValues] = useState(
    entityConfig.fields.reduce((acc, cur) => {
      if (cur.type === 'dateinput') {
        acc[cur.key] = null
      } else {
        acc[cur.key] = ''
      }
      return acc
    }, {})
  )

  useEffect(() => {
    if (data) {
      setValues(
        entityConfig.fields.reduce((acc, cur) => {
          if (cur.type === 'dateinput') {
            acc[cur.key] = data[cur.key]
          } else {
            acc[cur.key] = data[cur.key]
          }
          return acc
        }, {})
      )
    }
  }, [data, entityConfig.fields])

  function handleChange (key, value) {
    setValues((values) => ({
      ...values,
      [key]: value,
    }))
  }
  return (
    <>
      {isMutationLoading || isLoading && <LoadingSign/>} 
      {!isMutationLoading && !isLoading && <>
        {headerLeftElement && createPortal(
        <h2>
          {entityId ? entityConfig.titles.edit : entityConfig.titles.add}
        </h2>,
        headerLeftElement)
      }
      {headerRightElement && createPortal(
        <>
          <StandardButton
            btnText={'Сохранить'}
            clickHandler={() => handleSubmit()}
          />
          <StandardButton
            btnText={'Отменить'}
            clickHandler={() => navigate(-1)}
          />
        </>,
        headerRightElement)
      }
      <form className='pg-edit-form' onSubmit={() => handleSubmit()}>
        {entityConfig.fields.map((field) => {
          if (field.type === 'textinput') {
            return (
              <div key={field.key} className='pg-input-wrapper'>
                <p className='pg-input-up-label'>
                  {field.label}
                </p>
                <input
                  className='pg-text-input'
                  type='text'
                  placeholder={field.placeholder}
                  value={values[field.key]}
                  onChange={(event) => handleChange(field.key, event.currentTarget.value)}
                />
              </div>
            )
          } else if (field.type === 'dateinput') {
            return (
              <div key={field.key} className='pg-input-wrapper'>
                <p className='pg-input-up-label'>
                  {field.label}
                </p>
                <input
                  type='date'
                  placeholder={field.placeholder}
                  value={getDateInputFormat(values[field.key])}
                  onChange={
                    (event) => handleChange(field.key, Date.parse(event.currentTarget.value))
                  }
                />
              </div>
            )
          }
        })}
      </form>
      </>}   
    </>
  )
}