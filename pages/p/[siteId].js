import {useState} from "react";
import {Box, Button, FormControl, FormLabel, Input} from "@chakra-ui/react";
import {getAllFeedback, getAllSites} from "@/lib/db-admin";
import {useAuth} from "@/lib/auth";
import {createFeedback} from "@/lib/db";
import Feedback from "@/components/Feedback";

const SiteFeedback = ({siteId,initialFeedback}) => {
  const [allFeedback,setAllFeedback] = useState(initialFeedback);
  const {user} = useAuth();
  const onSubmit = async (e) => {
    e.preventDefault();
    const newFeedback = {
      author: user.name,
      authorId: user.uid,
      siteId,
      text: e.target.comment.value,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: 'pending'
    };
    const id = await createFeedback(newFeedback);
    setAllFeedback(oldFeedback => [...oldFeedback, {...newFeedback, id}]);
  }

  return <Box
    display="flex"
    flexDirection="column"
    w="full"
    maxW="700px"
    m="0 auto"
  >
    <Box as="form" onSubmit={onSubmit}>
      <FormControl my={8}>
        <FormLabel htmlFor="comment" id="comment-label">Comment</FormLabel>
        <Input id="comment" />
        <Button variant="solid" size="md" type="submit" mt={2}>
          Add comment
        </Button>
      </FormControl>
    </Box>
    {allFeedback.map(feedback => <Feedback key={feedback.id} {...feedback} />)}
  </Box>;
}

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const {feedback} = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback,
      siteId
    },
  }
}

export async function getStaticPaths() {
  const {sites} = await getAllSites();

  const paths = sites.map(site => ({
    params: {
      siteId: site.id.toString()
    }
  }));

  return {
    paths,
    fallback: false
  };
}

export default SiteFeedback;
