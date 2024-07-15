# happy-language-friends

Something Cool is Coming

```bash
python -m venv venv
source venv/bin/activate
pip install "huggingface_hub[cli]"
huggingface-cli download bartowski/gemma-2-9b-it-GGUF --include "gemma-2-9b-it-Q4_K_M.gguf" --local-dir ~/local_llms/
pip install llama-cpp-python
```

```python
# https://llama-cpp-python.readthedocs.io/en/stable/
from llama_cpp import Llama
llm = Llama(
      model_path="/Users/josephbolton/local_llms/lmstudio-ai/gemma-2b-it-GGUF/gemma-2b-it-q4_k_m.gguf",
      # n_gpu_layers=-1, # Uncomment to use GPU acceleration
      # seed=1337, # Uncomment to set a specific seed
      # n_ctx=2048, # Uncomment to increase the context window
)
```
