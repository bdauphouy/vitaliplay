import Image from 'next/image'
import Title from '../components/Title'
import Subtitle from '../components/Subtitle'
import { useEffect, useState } from 'react'

const OurSolution = () => {
  const [sections] = useState([
    {
      id: 0,
      title: 'Bilan de santé personnalisé',
      subtitle: `Le bilan a été élaboré par des professionnels de santé et basé sur
      des tests validés scientifiquement. Il permet d'évaluer votre
      condition physique globale (force, souplesse, endurance et
      équilibre), votre bien être subjectif et votre niveau d'activité
      quotidien. Il permet de vous indiquer vos points forts et vos axes
      d’amélioration. Vous pourrez ainsi suivre l'évolution de vos
      résultats régulièrement.`,
    },
    {
      id: 1,
      title: 'Des séances variées',
      subtitle: `DIFFÉRENTES DISCIPLINES
      <br />
      Les séances sont variées et originales afin que vous puissiez
      découvrir de nouvelles disciplines : Taïso, Danse, stretching,
      Yoga, Relaxation, Boxe.
      <br />
      <br />
      DES SÉANCES ADAPTÉES À VOS CAPACITÉS
      <br />
      L'enseignant, spécialiste de sa discipline, propose différents
      niveaux de difficultés pour chaque exercice afin qu'il soit adapté
      à chacun.`,
    },
    {
      id: 2,
      title: 'Conseils de professionels de santé',
      subtitle: `Les conférences étant en live, vous pouvez poser vos questions aux
      professionnels. Les vidéos sont accessibles en permanence sur le
      site à la suite du direct.
      <br />
      <br />
      DIFFÉRENTS THÈMES ABORDÉS
      <br />
      Les thèmes abordés sont tous axés autour de la santé et du
      bien-être. L’objectif est de s’appuyer sur les recommandations
      scientifiques actuelles et de laisser de côté certaines croyances
      qui ne sont plus d’actualité.
      <br />
      <br />
      DE NOMBREUX PROFESSIONNELS
      <br />
      Médecin, kinésithérapeute, enseignant en activité physique
      adaptée, infirmier. Ces différents spécialistes mènent les
      conférences en fonction des thèmes abordés.`,
    },
    {
      id: 3,
      title: 'Séances en direct',
      subtitle: `Elles sont réalisées, en direct, toutes les semaines par des enseignants en activité physique adaptée. Un calendrier et un système d'alerte vous permet de ne pas les manquer.
      Si vous n’êtes pas disponibles à l’heure prévue, pas de panique, les vidéos sont accessibles en rediffusion à la suite du direct.`,
    },
    {
      id: 4,
      title: 'Conseils personnalisés',
      subtitle: `A la suite du bilan, nous vous conseillons les axes à travailler davantage afin de progresser. Des séances vous sont automatiquement sélectionnées afin de privilégier les domaines dans lesquels vous avez le plus de difficultés.`,
    },
  ])

  const getSectionById = id => {
    for (let section of sections) {
      if (section.id === id) {
        return section
      }
    }

    return {
      title: '',
      subtitle: '',
    }
  }

  const [currentSection, setCurrentSection] = useState(0)

  return (
    <div className="mt-32 px-6 lg:px-0">
      <div className="flex flex-col">
        <div
          className="lg:max-w-2xl self-center lg:py-16 lg:px-6"
          style={{ minHeight: '25rem' }}>
          <Title type="1" center={true}>
            Un ensemble de services à votre disposition
          </Title>
          <div className="mt-10">
            <Subtitle center={true}>
              Dans le but de vous accompagner au mieux afin de rester en pleine
              forme et plein de vitalité.
            </Subtitle>
          </div>
        </div>
        <div className="hidden min-h-4/5-screen lg:flex justify-between pl-24">
          <div className="w-1/2">
            <ul className="inline-flex items-center gap-4 bg-blue-50 rounded-full px-4 py-3">
              <li
                className="text-light-100 bg-blue-900 py-1.25 px-6 rounded-full font-bold font-body uppercase cursor-pointer text-md"
                onClick={() => setCurrentSection(0)}>
                Bilan
              </li>
              <li
                className="text-blue-500 py-1.25 px-6 rounded-full font-bold font-body uppercase cursor-pointer text-md"
                onClick={() => setCurrentSection(1)}>
                Séances
              </li>
              <li
                className="text-blue-500 py-1.25 px-6 rounded-full font-bold font-body uppercase cursor-pointer text-md"
                onClick={() => setCurrentSection(2)}>
                Conférences santé
              </li>
              <li
                className="text-blue-500 py-1.25 px-6 rounded-full font-bold font-body uppercase cursor-pointer text-md"
                onClick={() => setCurrentSection(3)}>
                Direct
              </li>
              <li
                className="text-blue-500 py-1.25 px-6 rounded-full font-bold font-body uppercase cursor-pointer text-md"
                onClick={() => setCurrentSection(4)}>
                Conseils
              </li>
            </ul>
            <div className="w-4/5">
              <div className="mt-36">
                <Title>{getSectionById(currentSection).title}</Title>
              </div>
              <div className="mt-8">
                <Subtitle>{getSectionById(currentSection).subtitle}</Subtitle>
              </div>
            </div>
          </div>
          <div className="w-2/5 relative">
            <Image src="/our-solution.jpg" layout="fill" objectFit="cover" />
          </div>
        </div>
        <div className="lg:hidden">
          <div className="h-96 relative mt-16">
            <Image src="/our-solution.jpg" layout="fill" />
          </div>
          <div className="mt-8">
            <Title>Bilan de santé personnalisé</Title>
          </div>
          <div className="mt-4">
            <Subtitle>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus
              pellentesque malesuada pellentesque ultricies leo sit. Ut in sed
              ultricies diam arcu et. Sed lectus feugiat aliquam urna, sed risus
              sed. Integer vestibulum dolor aliquam volutpat lectus.
              <br />
              <br />
              Etiam vitae id facilisis neque quam ornare vestibulum, sagittis
              non. Magna phasellus nec fermentum, faucibus. Cras feugiat varius
              quam non magna suspendisse.{' '}
            </Subtitle>
          </div>
          <div className="h-96 relative mt-16">
            <Image src="/our-solution.jpg" layout="fill" />
          </div>
          <div className="mt-8">
            <Title>Des séances variées</Title>
          </div>
          <div className="mt-4">
            <Subtitle>
              DIFFÉRENTES DISCIPLINES
              <br />
              Les séances sont variées et originales afin que vous puissiez
              découvrir de nouvelles disciplines : Taïso, Danse, stretching,
              Yoga, Relaxation, Boxe.
              <br />
              <br />
              DES SÉANCES ADAPTÉES À VOS CAPACITÉS
              <br />
              L'enseignant, spécialiste de sa discipline, propose différents
              niveaux de difficultés pour chaque exercice afin qu'il soit adapté
              à chacun.
            </Subtitle>
          </div>
          <div className="h-96 relative mt-16">
            <Image src="/our-solution.jpg" layout="fill" />
          </div>
          <div className="mt-8">
            <Title>Conseils de professionnels de santé</Title>
          </div>
          <div className="mt-4">
            <Subtitle>
              Les conférences étant en live, vous pouvez poser vos questions aux
              professionnels. Les vidéos sont accessibles en permanence sur le
              site à la suite du direct.
              <br />
              <br />
              DIFFÉRENTS THÈMES ABORDÉS
              <br />
              Les thèmes abordés sont tous axés autour de la santé et du
              bien-être. L’objectif est de s’appuyer sur les recommandations
              scientifiques actuelles et de laisser de côté certaines croyances
              qui ne sont plus d’actualité.
              <br />
              <br />
              DE NOMBREUX PROFESSIONNELS
              <br />
              Médecin, kinésithérapeute, enseignant en activité physique
              adaptée, infirmier. Ces différents spécialistes mènent les
              conférences en fonction des thèmes abordés.
            </Subtitle>
          </div>
          <div className="h-96 relative mt-16">
            <Image src="/our-solution.jpg" layout="fill" />
          </div>
          <div className="mt-8">
            <Title>Séances en direct</Title>
          </div>
          <div className="mt-4">
            <Subtitle>
              Elles sont réalisées, en direct, toutes les semaines par des
              enseignants en activité physique adaptée. Un calendrier et un
              système d'alerte vous permet de ne pas les manquer. Si vous n’êtes
              pas disponibles à l’heure prévue, pas de panique, les vidéos sont
              accessibles en rediffusion à la suite du direct.
            </Subtitle>
          </div>
          <div className="h-96 relative mt-16">
            <Image src="/our-solution.jpg" layout="fill" />
          </div>
          <div className="mt-8">
            <Title>Conseils personnalisés</Title>
          </div>
          <div className="mt-4">
            <Subtitle>
              A la suite du bilan, nous vous conseillons les axes à travailler
              davantage afin de progresser. Des séances vous sont
              automatiquement sélectionnées afin de privilégier les domaines
              dans lesquels vous avez le plus de difficultés.
            </Subtitle>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurSolution
