import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Flex, Box, Heading, IconButton, SimpleGrid, SkeletonText, Card, Skeleton } from "@chakra-ui/react"
import { useRef } from "react";
import { Anime, RecentAnime } from "../../types/interface";
import AnimeCard from "./AnimeCard";
import RecentEpisodeCard from "./RecentEpisodeCard";

interface AnimeSection {
    title: string,
    isLoading: boolean | undefined,
    section: Anime[],
    cardType: 'episode' | 'detail'
}

const CardSkeleton: React.FC = () => {
    return (
        <Card shadow={'none'} rounded={'2xl'} maxW={'240px'} minWidth={'240px'} mx='auto'>
            <Skeleton rounded={'3xl'} height='300px'></Skeleton>
            <SkeletonText mt='4' rounded={'2xl'} noOfLines={2} spacing='4' skeletonHeight='8' />
        </Card>
    );
};

const AnimeSection: React.FC<AnimeSection> = ({ title, isLoading, section, cardType }: AnimeSection) => {

    console.log("SECTION: "+cardType, section);
    
    const scrollRef = useRef<HTMLInputElement>(null);

    const handleScrollButton = (direction: string) => {
        if (direction === 'left') {
            if (scrollRef.current != null) {
                scrollRef.current.scrollLeft -= 800;
            }
        } else {
            if (scrollRef.current != null) {
                scrollRef.current.scrollLeft += 800;

            }
        }
    }
    return (<Box>
        <Flex mb={4} p={0} justifyContent={'space-between'} alignItems={'baseline'}>
            <Heading mb={4} fontSize={{ base: '2xl' }}>{title}</Heading>
            <Flex gap={3} display={{ base: "none", md: 'flex', lg: 'flex' }}>
                <IconButton onClick={() => { handleScrollButton('left') }} aria-label="Left Scroll">
                    <ChevronLeftIcon h={6} w={6} />
                </IconButton>
                <IconButton onClick={() => { handleScrollButton('right') }} aria-label="Right Scroll">
                    <ChevronRightIcon h={6} w={6} />
                </IconButton>
            </Flex>
        </Flex>
        {isLoading ? (
            // You forgot to add a key when you map an array
            <SimpleGrid gap={'24'} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                {[...Array(20)].map((_, i) => (
                    <CardSkeleton
                        key={i}
                    />
                ))}
            </SimpleGrid>
        ) : (
            <Flex ref={scrollRef} gap={2} overflowX="auto" sx={{
                scrollBehavior: 'smooth',
                '&::-webkit-scrollbar': { display: 'none' },
                '&::-moz-scrollbar': { display: 'none' },
                '-ms-overflow-style': 'none',  /* IE and Edge */
                'scrollbar-width': 'none',
                /* Firefox */
            }}>
                <Flex gap={6} pos={'relative'}>
                    {section.map((anime, id) => (
                        cardType === 'episode' ? (
                            <RecentEpisodeCard
                                key={id}
                                title={anime.title}
                                image={anime.image}
                                episodeId={anime.episodeId}
                                id={anime.id}
                                type={anime.type}
                                episodeNumber={anime.episodeNumber} />
                        ) : (
                            <AnimeCard
                                key={id}
                                title={anime.title}
                                image={anime.image}
                                episodeId={anime.episodeId}
                                id={anime.id}
                                type={anime.type}
                                episodeNumber={anime.episodeNumber} />
                        )
                    ))}
                </Flex>
            </Flex>
        )}
    </Box>)
}

export default AnimeSection;