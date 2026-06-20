package vastra_backend.requestDTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import vastra_backend.enums.Size;

@Data
public class OrderRequest {

    @NotNull(message = "Product id is required")
    private Long productId;

    @NotNull(message = "Size is required")
    private Size size;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;
}
