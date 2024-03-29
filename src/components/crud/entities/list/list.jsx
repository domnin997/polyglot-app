import './list.css'
import LoadingSign from '../../../loader/loadingSign'
import { PageLayoutContext } from '../../../../context/layoutContext'
import { useContext } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export default function CrudEntitiesList ({
  id,
  entityConfig,
  entitiesQuery,
  entityFilters,
  entityActions
}) {
  const navigate = useNavigate();
  const userToken = useSelector((state) => state.auth.token)

  const queryParams = {}
  queryParams.userId = userToken
  if (id) {
    queryParams.entityId = id
  }
  const {
    data,
    isLoading
  } = entitiesQuery(queryParams)
  const {
    headerLeftElement,
    headerRightElement,
  } = useContext(PageLayoutContext);
  
  const listStyle = `pg-list-wrapper ${entityConfig.style.direction}`
  return (
    <>
    {isLoading && <LoadingSign />}
    {!isLoading && <>
      {headerLeftElement && createPortal(
        <h2>
          {entityConfig.titles.index}
        </h2>,
        headerLeftElement
      )}
      {headerRightElement && entityConfig.add && createPortal(
        <button className='header-right__btn' onClick={() => navigate('create')}>
          Добавить
        </button>,
        headerRightElement
      )}
      <ul className={listStyle}>
        {data && data.map((entityData) => (
          <li className='pg-list-item' key={entityData.id}>
            <div className='text-fields-wrap'
                 onClick={() => {navigate(entityData.id)}}>
              {entityConfig.textFields && entityConfig.textFields.map((field) => (
                <div className='text-field' key={field.key}>
                  {field.content(entityData)}
                </div>
              ))}
            </div>
            <div className='actions-wrap'>
              {entityConfig.actions && entityConfig.actions.map((action) => {
                const IconComponent = action.icon;
                return (
                  <div key={action.key} className='icon-container'>
                    <IconComponent 
                      className={action.class}
                      onClick={
                        () => entityActions[action.key].handler(entityData, userToken)
                      }
                    />
                  </div>
                )})}
              </div>
            </li>
          ))}
        </ul>
      </>}
    </>
  )
}