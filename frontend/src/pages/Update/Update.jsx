import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Modal from '../../components/Modal/Modal';
import { ReactComponent as EditArticle } from '../../assets/icons/editArticle.svg';
import ReactQuillEditor from '../../components/ReactQuillEditor/ReactQuillEditor';
import './update.css';

const Update = () => {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [author, setAuthor] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isPending } = useFetch(`http://localhost:8000/blogs/${id}`);

  const getContent = (data) => setContent(data);
  
  useEffect(() => {

    if (!isPending) {
      setTitle(data.title);
      setContent(data.content);
      setAuthor(data.author);
    }

  }, [isPending, data]);

  const closeModal = () => setOpen(false);
  const showModal = () => setOpen(true);
  
  const handlePreview = () => { 
    sessionStorage.setItem('content', content);
    window.open('/preview', '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const blog = { title, content, author };

    await fetch('http://localhost:8000/blogs/' + data.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blog),
    });

    navigate('/blogs/' + data.id);

  };

  return (
    <div>
      {isPending ? <div>Loading...</div> : <div className='update'>
        <h2> Update a blog </h2>
        <form onSubmit={handleSubmit}>
          <label>Blog title </label>
          <input
            defaultValue={data.title}
            type='text'
            required
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Blog body</label>

          <div style={{ height: '30em' }}>
            <ReactQuillEditor data={data} getContent={getContent}/>
          </div>

          <button type='button' onClick={handlePreview}>Preview</button>

          { open && (
              <Modal handleSubmit={handleSubmit} closeModal={closeModal} icon={<EditArticle />}/>
            )
          }

          <label>Blog Author:</label>
          <select
            defaultValue={data.author}
            onChange={(e) => setAuthor(e.target.value)}
          >
            <option value='Mario'>Mario</option>
            <option value='Yoshi'>Yoshi</option>
          </select>

          <button className='update_button_update' type='button' onClick={showModal}>Update blog</button>

        </form>
      </div>}

    </div>

  );
}

export default Update;