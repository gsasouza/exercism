defmodule WordCount do
  @doc """
  Count the number of words in the sentence.

  Words are compared case-insensitively.
  """
  @spec count(String.t()) :: map
  def count(sentence) do
    character_only_word = String.replace(sentence, ~r/[!&@$%^&:,_]/, " ")
    Enum.reduce(String.split(character_only_word, " "), %{}, &group_by_word/2)
  end

  defp group_by_word(word, acc) do
    key = String.downcase(word)
    if key == "" do
      acc
    else if Map.has_key?(acc, key) do
        %{ acc | key => acc[key] + 1}
      else
        Map.merge(acc, %{ key => 1})
      end
    end
  end
end
