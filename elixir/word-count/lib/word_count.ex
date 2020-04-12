defmodule WordCount do
  @doc """
  Count the number of words in the sentence.

  Words are compared case-insensitively.
  """

  @spec count(String.t()) :: map
  def count(sentence) do
    sanitized_sentence = String.replace(sentence, ~r/[^A-Za-zÀ-ÿ0-9\-]/, " ")
    split_sentence = String.split(sanitized_sentence, " ", trim: true)
    Enum.reduce(split_sentence, %{}, &group_by_word/2)
  end

  defp group_by_word(word, acc) do
    Map.update(acc, String.downcase(word), 1, &(&1 + 1))
  end
end
