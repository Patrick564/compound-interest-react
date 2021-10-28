import { Formik, Form } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'

import Balance from './components/Balance.js'
import Button from './components/Button.js'
import Container from './components/Container.js'
import Input from './components/Input.js'
import Section from './components/Section.js'

const compoundInterest = (deposit, contribution, years, rate) => {
	let total = deposit

	for (let i = 0; i < years; i++) {
		total = (total + contribution) * (rate + 1)
	}

	return Math.round(total)
}

const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
})

const App = () => {
	const [balance, setBalance] = useState('')

	const handleSubmit = ({ deposit, contribution, years, rate }) => {
		const val = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))

		setBalance(formatter.format(val))
	}

	return (
		<Container>
			<Section>
				<Formik initialValues={{
					deposit: '',
					contribution: '',
					years: '',
					rate: ''
				}}
				        onSubmit={handleSubmit}
				        validationSchema={Yup.object({
					        deposit: Yup.number().required('Completar').typeError('Debe ser número'),
					        contribution: Yup.number().required('Completar').typeError('Debe ser número'),
					        years: Yup.number().required('Completar').typeError('Debe ser número'),
					        rate: Yup
						              .number()
						              .required('Completar')
						              .typeError('Debe ser número')
						              .min(0, 'Min 0')
						              .max(1, 'Máx 1'),
				        })}
				>
					<Form>
						<Input name={'deposit'} label={'Deposito inicial'} />
						<Input name={'contribution'} label={'Contribucion anual'} />
						<Input name={'years'} label={'Años'} />
						<Input name={'rate'} label={'interés estimado'} />

						<Button type={'submit'}>Calcular</Button>
					</Form>
				</Formik>

				{balance !== '' ? <Balance>Balance final: {balance}</Balance> : null}
			</Section>
		</Container>
	)
}

export default App
