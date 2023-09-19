import { View, Text, TouchableOpacity,ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './nearbyjobs.style'
import { COLORS} from '../../../constants'
import PopularJobCard from '../../common/cards/nearby/NearbyJobCard'
import useFetch from '../../../hook/useFetch'

const NearbyJobs = () => {
  const router = useRouter()
  const {data,isLoading,error} = useFetch("search",{
    query: "React developer",
    page: '1',
    num_pages: '1'
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Empregos pertos</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Mostrar todos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading?(
          <ActivityIndicator size="large" colors={COLORS.primary}/>
        ): error ?(
          <Text>Alguma coisa deu errado!</Text>
        ): (
          data?.map((job)=>(
            <NearbyJobs
              job={job}
              key={`nearby-job-${job?.job_id}`}
              handleNavigate={()=> router.push(`/job-details/${job.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  )
}

export default NearbyJobs