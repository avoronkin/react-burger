import { FC } from 'react'
import styles from './orders-statistic.module.css'

export interface OrdersStatisticsProps {
    done: string[]
    processing: string[]
    total: number
    totalToday: number
}
export const OrdersStatistics: FC<OrdersStatisticsProps> = ({ done, processing, total, totalToday }) => {
    const rowSize = 10
    const doneRows = []
    for (let i = 0; i < done.length; i += rowSize) {
        const row = done.slice(i, i + rowSize)
        doneRows.push(row)
    }

    const processingRows = []
    for (let i = 0; i < processing.length; i += rowSize) {
        const row = processing.slice(i, i + rowSize)
        processingRows.push(row)
    }

    let headerGridTemplateColumns = ''
    if (doneRows.length) {
        headerGridTemplateColumns += `${doneRows.length}fr `
    }
    if (processingRows.length) {
        headerGridTemplateColumns += `${processingRows.length}fr `
    }

    const rowsGridTemplateColumns = [...Array(doneRows.length + processingRows.length)].map(() => '1fr').join(' ')

    return (
        <div className='ml-5'>
            <div className={`${styles.ordersNumbersByStatus} mb-8`}>
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: headerGridTemplateColumns
                }}>
                    {
                        doneRows.length ? <div>
                            <h4 className='text text_type_main-medium mb-3'>Готовы:</h4>
                        </div> : null

                    }
                    {
                        processingRows.length ? <div>
                            <h4 className='text text_type_main-medium  mb-3'>В&nbsp;работе:</h4>
                        </div> : null
                    }
                </div>
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: rowsGridTemplateColumns
                }}>
                    {
                        doneRows.map((done, rowIndex) => {
                            return (
                                <div className={`${styles.statusRow} mr-2`} key={rowIndex}>
                                    {
                                        done.map((id, index) => {
                                            return (<p className={`${styles.statusDone} text text_type_main-small`} key={index}>{id}</p>)
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                    {
                        processingRows.map((processing, rowIndex) => {
                            return (
                                <div className={`${styles.statusRow} mr-2`} key={rowIndex}>
                                    {
                                        processing.map((id, index) => {
                                            return (<p className='text text_type_main-small' key={index}>{id}</p>)
                                        })
                                    }
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <div className='mb-3'>
                <h4 className='text text_type_main-medium  mb-3'>Выполненно за всё время:</h4>
                <p className='text text_type_digits-large'>{total}</p>
            </div>
            <div className='mb-3'>
                <h4 className='text text_type_main-medium  mb-3'>Выполненно за сегодня:</h4>
                <p className='text text_type_digits-large'>{totalToday}</p>
            </div>
        </div>
    )
}